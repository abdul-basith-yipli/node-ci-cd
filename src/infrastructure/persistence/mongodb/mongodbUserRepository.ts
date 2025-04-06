import { IUserRepository } from "../../../domain/interfaces/userRepository";
import { User } from "../../../domain/entities/user";
import { UserModel } from "./models/userModel";

export class MongoDBUserRepository implements IUserRepository {
  async create(user: Partial<User>): Promise<User> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();

      return new User(
        savedUser.id,
        savedUser.email,
        savedUser.password,
        savedUser.name
      );
    } catch (error: any) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new Error("Email already exists");
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findOne({ email });
      if (!userDoc) {
        return null;
      }

      return new User(
        userDoc.id,
        userDoc.email,
        userDoc.password,
        userDoc.name
      );
    } catch (error: any) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }
}
