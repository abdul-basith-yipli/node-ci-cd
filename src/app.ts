import express from "express";
import { setupAuthRoutes } from "./application/routes/authRoutes";
import { AuthController } from "./application/controllers/authController";
import { MongoDBUserRepository } from "./infrastructure/persistence/mongodb/mongodbUserRepository";
import { AuthService } from "./domain/services/authService";
import { JWTTokenService } from "./infrastructure/services/jwtTokenService";
import { BcryptPasswordService } from "./infrastructure/services/bcryptPasswordService";
import { config } from "dotenv";

config(); // Load environment variables from .env file

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

app.get("/a", (req, res) => {
  res.send("a!");
});

app.get("/test", (req, res) => {
  res.send("Hello, test!");
});

app.get("/test1", (req, res) => {
  res.send("Hello, test1!");
});

console.log("Health check enabled:", process.env.FEAT_HEALTH_CHECK);
console.log("Authentication enabled:", process.env.FEAT_AUTHENTICATION);

// Routes
if (process.env.FEAT_AUTHENTICATION === "true") {
  app.use("/api/auth", setupAuthRoutes(authController));
}

export default app;
