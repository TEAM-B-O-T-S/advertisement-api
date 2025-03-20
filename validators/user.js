import Joi from "joi";

export const registerUserValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().valid('user', 'vendor').default('user'),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
});
