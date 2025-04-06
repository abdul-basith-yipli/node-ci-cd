import { AuthService } from "../../../../src/domain/services/authService";
import {
  IPasswordService,
  ITokenService,
  IUserRepository,
} from "../../../../src/types/auth.types";
import {
  AlreadyExistsError,
  AuthenticationError,
} from "../../../../src/application/errors/customErrors";

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockTokenService: jest.Mocked<ITokenService>;
  let mockPasswordService: jest.Mocked<IPasswordService>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    mockTokenService = {
      generateToken: jest.fn(),
    } as jest.Mocked<ITokenService>;

    mockPasswordService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<IPasswordService>;

    authService = new AuthService(
      mockUserRepository,
      mockTokenService,
      mockPasswordService
    );
  });

  describe("register", () => {
    it("should throw AlreadyExistsError if email is already registered", async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce({ id: "1" } as any);

      await expect(
        authService.register({
          email: "test@example.com",
          password: "1234",
          name: "Test",
        })
      ).rejects.toThrow(AlreadyExistsError);
    });

    it("should hash the password and create a new user", async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);
      mockPasswordService.hash.mockResolvedValueOnce("hashedPassword");
      mockUserRepository.create.mockResolvedValueOnce({
        id: "1",
        email: "test@example.com",
        name: "Test",
        password: "hashedPassword",
      } as any);
      mockTokenService.generateToken.mockReturnValueOnce("token");

      const result = await authService.register({
        email: "test@example.com",
        password: "1234",
        name: "Test",
      });

      expect(mockPasswordService.hash).toHaveBeenCalledWith("1234");
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "hashedPassword",
        name: "Test",
      });
      expect(result).toEqual({
        token: "token",
        user: { id: "1", email: "test@example.com", name: "Test" },
      });
    });
  });

  describe("login", () => {
    it("should throw AuthenticationError if user is not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);

      await expect(
        authService.login({ email: "test@example.com", password: "1234" })
      ).rejects.toThrow(AuthenticationError);
    });

    it("should throw AuthenticationError if password is invalid", async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce({
        id: "1",
        email: "test@example.com",
        password: "hashedPassword",
      } as any);
      mockPasswordService.compare.mockResolvedValueOnce(false);

      await expect(
        authService.login({ email: "test@example.com", password: "1234" })
      ).rejects.toThrow(AuthenticationError);
    });

    it("should return token and user if credentials are valid", async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce({
        id: "1",
        email: "test@example.com",
        password: "hashedPassword",
      } as any);
      mockPasswordService.compare.mockResolvedValueOnce(true);
      mockTokenService.generateToken.mockReturnValueOnce("token");

      const result = await authService.login({
        email: "test@example.com",
        password: "1234",
      });

      expect(mockPasswordService.compare).toHaveBeenCalledWith(
        "1234",
        "hashedPassword"
      );
      expect(result).toEqual({
        token: "token",
        user: { id: "1", email: "test@example.com", name: undefined },
      });
    });
  });
});
