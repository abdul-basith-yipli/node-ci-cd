import { AuthResponse } from "../../types/auth.types";

export interface IAuthService {
  register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse>;

  login(data: { email: string; password: string }): Promise<AuthResponse>;
}
