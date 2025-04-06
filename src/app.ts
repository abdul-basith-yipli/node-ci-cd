import express from "express";
import { setupAuthRoutes } from "./application/routes/authRoutes";
import { AuthController } from "./application/controllers/authController";
import { MongoDBUserRepository } from "./infrastructure/persistence/mongodb/mongodbUserRepository";
import { AuthService } from "./domain/services/authService";
import { JWTTokenService } from "./infrastructure/services/jwtTokenService";
import { BcryptPasswordService } from "./infrastructure/services/bcryptPasswordService";

// Dependencies
const userRepository = new MongoDBUserRepository();
const tokenService = new JWTTokenService();
const passwordService = new BcryptPasswordService();
const authService = new AuthService(
  userRepository,
  tokenService,
  passwordService
);
const authController = new AuthController(authService);

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use("/api/auth", setupAuthRoutes(authController));

export default app;
