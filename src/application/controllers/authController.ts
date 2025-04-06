import { Request, Response } from "express";
import { AuthService } from "../../domain/services/authService";
import { handleControllerError } from "../utils/errorHandler";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.authService.login(req.body);
      res.json(result);
    } catch (error) {
      handleControllerError(res, error);
    }
  }
}
