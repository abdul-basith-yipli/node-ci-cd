export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: UserDTO;
}

export interface IAuthService {
  register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse>;
  login(data: { email: string; password: string }): Promise<AuthResponse>;
}

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export interface ITokenService {
  generateToken(payload: object): string;
}

export interface IPasswordService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
