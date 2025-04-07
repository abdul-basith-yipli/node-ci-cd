import { User } from "../../../../src/domain/entities/user";

describe("User Entity", () => {
  it("should create a user instance with correct properties", () => {
    const user = new User("1", "test@example.com", "hashedpass", "Test User");

    expect(user.id).toBe("1");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("hashedpass");
    expect(user.name).toBe("Test User");
  });

  it("should validate email correctly", () => {
    expect(User.isValidEmail("test@example.com")).toBe(true);
    expect(User.isValidEmail("invalid-email")).toBe(false);
    expect(User.isValidEmail("")).toBe(false);
  });
});
