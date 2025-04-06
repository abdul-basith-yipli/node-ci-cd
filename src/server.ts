import { config } from "dotenv";
import app from "./app";
import { connectDB } from "./infrastructure/config/database";

// Load environment variables from .env file
config();
// Check if the environment variable is set
async function startServer() {
  const PORT = process.env.PORT || 3000;

  // Start server
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
