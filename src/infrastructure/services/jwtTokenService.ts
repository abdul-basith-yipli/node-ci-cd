import jwt from "jsonwebtoken";
import { ITokenService } from "../../domain/interfaces/tokenService";

export class JWTTokenService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(
    secret: string = process.env.JWT_SECRET!,
    expiresIn: string = process.env.JWT_EXPIRES_IN!
  ) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    try {
      return jwt.sign(payload, this.secret, {
        expiresIn: this.expiresIn,
      } as jwt.SignOptions);
    } catch (error: any) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }
}
