import {
  AuthResponse,
  IPasswordService,
  ITokenService,
  IUserRepository,
  UserDTO,
} from "../../types/auth.types";
import { User } from "../entities/user";
import { IAuthService } from "../interfaces/authService";
import {
  ValidationError,
  AuthenticationError,
  AlreadyExistsError,
} from "../../application/errors/customErrors";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService
  ) {}

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> {
    // Check for existing user
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AlreadyExistsError("Email");
    }

    // Hash password
    const hashedPassword = await this.passwordService.hash(data.password);

    // Create and save new user
    const userData = {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    };

    const user = await this.userRepository.create(userData);

    // Generate token
    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });

    return this.createAuthResponse(user, token);
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    // Find user
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Verify password
    const isValidPassword = await this.passwordService.compare(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Generate token
    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });

    return this.createAuthResponse(user, token);
  }

  private createAuthResponse(user: User, token: string): AuthResponse {
    const userDTO: UserDTO = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      token,
      user: userDTO,
    };
  }
}
