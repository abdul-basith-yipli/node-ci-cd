import {
  AppError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  AlreadyExistsError,
} from "../../../src/application/errors/customErrors";

describe("Custom Errors", () => {
  it("should create an AppError with default values", () => {
    const error = new AppError("Something went wrong");
    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(500);
    expect(error.code).toBe("INTERNAL_ERROR");
  });

  it("should create a ValidationError", () => {
    const error = new ValidationError("Invalid input");
    expect(error.message).toBe("Invalid input");
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("VALIDATION_ERROR");
  });

  it("should create an AuthenticationError", () => {
    const error = new AuthenticationError("Unauthorized access");
    expect(error.message).toBe("Unauthorized access");
    expect(error.statusCode).toBe(401);
    expect(error.code).toBe("AUTHENTICATION_ERROR");
  });

  it("should create a NotFoundError", () => {
    const error = new NotFoundError("User");
    expect(error.message).toBe("User not found");
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
  });

  it("should create an AlreadyExistsError", () => {
    const error = new AlreadyExistsError("Email");
    expect(error.message).toBe("Email already exists");
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe("ALREADY_EXISTS");
  });
});
