import bcrypt from "bcryptjs";
import { IPasswordService } from "../../domain/interfaces/passwordService";

export class BcryptPasswordService implements IPasswordService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error: any) {
      throw new Error(`Failed to hash password: ${error.message}`);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error: any) {
      throw new Error(`Failed to compare password: ${error.message}`);
    }
  }
}
