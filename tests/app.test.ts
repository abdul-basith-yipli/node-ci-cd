import request from "supertest";
import app from "../src/app";
// Import the app from the main application file

describe("GET /", () => {
  if (process.env.FEAT_HEALTH_CHECK === "true") {
    it("should return 'Hello, World!' when health check is enabled", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, World!");
    });
  } else {
    it("should return 404 when health check is disabled", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(404);
    });
  }
});
