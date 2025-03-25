import { Router } from "express";
import {
  getAuthenticated,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user_controller.js";
import { authorize } from "../middlewares/authz.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = Router();

//Define routes
userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.patch("/users/:id", auth, authorize(["admin"]), updateUser);
userRouter.get("/users/me", auth, getAuthenticated);

//export router
export default userRouter;
