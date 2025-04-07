import mongoose from "mongoose";
import { User } from "../../../../domain/entities/user";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: User.isValidEmail,
        message: "Invalid email format",
      },
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString(); // Map _id to id
        delete ret._id;
        delete ret.__v;
        delete ret.password; // Exclude the password field
        return ret;
      },
    },
  }
);

export const UserModel = mongoose.model<User & mongoose.Document>(
  "User",
  userSchema
);
