import { AuthController } from "../../../src/application/controllers/authController";
import { AuthService } from "../../../src/domain/services/authService";
import { Request, Response } from "express";

describe("AuthController", () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
    } as any;

    authController = new AuthController(mockAuthService);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register", () => {
    it("should register user successfully", async () => {
      const userData = {
        email: "test@example.com",
        password: "pass123",
        name: "Test",
      };
      const authResponse = {
        token: "jwt.token",
        user: { id: "1", email: "test@example.com", name: "Test" },
      };

      mockRequest.body = userData;
      mockAuthService.register.mockResolvedValue(authResponse);

      await authController.register(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockAuthService.register).toHaveBeenCalledWith(userData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(authResponse);
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      const loginData = { email: "test@example.com", password: "pass123" };
      const authResponse = {
        token: "jwt.token",
        user: { id: "1", email: "test@example.com", name: "Test" },
      };

      mockRequest.body = loginData;
      mockAuthService.login.mockResolvedValue(authResponse);

      await authController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
      expect(mockResponse.json).toHaveBeenCalledWith(authResponse);
    });
  });
});
