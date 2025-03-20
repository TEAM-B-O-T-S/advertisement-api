import { Schema, model, modelNames } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "vendor", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(normalize);
export const UserModel = model("User", userSchema);
