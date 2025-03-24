import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user_controller.js";
import { authorize } from "../middlewares/authz.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id",auth, authorize (['admin']), updateUser);

//export router
export default userRouter;
