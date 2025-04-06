import mongoose from "mongoose";
import { UserModel } from "../../../../../../src/infrastructure/persistence/mongodb/models/userModel";

describe("UserModel Schema", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/Node-CI-CD-test");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should save a valid user", async () => {
    const user = new UserModel({
      email: "unique1@example.com", // Updated to use a unique email
      password: "securepassword",
      name: "Test User",
    });

    const savedUser = await user.save();
    const savedUserJSON = savedUser.toJSON(); // Explicitly call toJSON
    expect(savedUserJSON).toMatchObject({
      id: expect.any(String),
      email: "unique1@example.com", // Updated to match the unique email
      name: "Test User",
    });
    expect(savedUserJSON.password).toBeUndefined(); // Password should not be exposed in toJSON
  });

  it("should fail to save a user with an invalid email", async () => {
    const user = new UserModel({
      email: "invalid-email",
      password: "securepassword",
      name: "Test User",
    });

    await expect(user.save()).rejects.toThrow("Invalid email format");
  });

  it("should fail to save a user without required fields", async () => {
    const user = new UserModel({
      email: "unique2@example.com", // Updated to use a unique email
    });

    await expect(user.save()).rejects.toThrow();
  });
});
