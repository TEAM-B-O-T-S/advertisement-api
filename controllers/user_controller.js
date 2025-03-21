import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../validators/user.js";
import { UserModel } from "../models/user_model.js";
import { sendEmail } from "../utils/mailing.js";

export const registerUser = async (req, res, next) => {
  //validate user information
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //check if user exists already
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    return res.status(409).json("user already exists");
  }
  //hash plaintext password
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  //create user record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  //send registration email to user
  const sendWelcomeEmail = await sendEmail(
    result.email,
    "Welcome to Notes",
    `Hello ${result.username} `
  );
  console.log(sendWelcomeEmail);
  //(optional) generate access token for user
  //return response
  res.status(201).json("user registered successfully");
};

export const loginUser = async (req, res, next) => {
  //validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // find matching user record in database
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("user does not exists");
  }
  //compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials");
  }
  //generate access token for user
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h", // Token expiration
    }
  );

  // Return response with token and role
  res.status(200).json({ accessToken, role: user.role });
};

export const updateUser = async (req, res, next) => {
  //validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //update user in database
  const result = await UserModel.findByIdAndUpdate(
    //for a user to update themselves (req.auth.id),
    //for a superadmin to update themselves
    req.params.id,
    value,
    { new: true }
  );
  //return response
  res.status(200).json(result);
};
