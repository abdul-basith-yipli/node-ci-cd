import request from "supertest";
import app from "../src/app";
// Import the app from the main application file

describe("GET /", () => {
  it("should return 'Hello, World!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, Worldd!");
  });
});
