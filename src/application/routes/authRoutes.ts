import { Router } from "express";
import { AuthController } from "../controllers/authController";

export function setupAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/register", authController.register.bind(authController));
  router.post("/login", authController.login.bind(authController));

  return router;
}
