import { MongoDBUserRepository } from "../../../src/infrastructure/persistence/mongodb/mongodbUserRepository";
import { UserModel } from "../../../src/infrastructure/persistence/mongodb/models/userModel";
import mongoose from "mongoose";

describe("MongoDBUserRepository", () => {
  let repository: MongoDBUserRepository;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/Node-CI-CD-test");
  });

  beforeEach(async () => {
    repository = new MongoDBUserRepository();
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a user", async () => {
    const userData = {
      email: "test@example.com",
      password: "hashedpassword",
      name: "Test User",
    };

    const createdUser = await repository.create(userData);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.name).toBe(userData.name);
  });

  it("should find user by email", async () => {
    const userData = {
      email: "test@example.com",
      password: "hashedpassword",
      name: "Test User",
    };

    await repository.create(userData);
    const foundUser = await repository.findByEmail(userData.email);

    expect(foundUser).not.toBeNull();
    expect(foundUser!.email).toBe(userData.email);
  });
});
