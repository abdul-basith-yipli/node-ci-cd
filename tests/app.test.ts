import request from "supertest";
import app from "../src/app";
// Import the app from the main application file

describe("GET /", () => {
  it("should return 'Hello, World!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});

// describe("GET /a", () => {
//   it("a!", async () => {
//     const response = await request(app).get("/a");
//     expect(response.status).toBe(200);
//     expect(response.text).toBe("Hello, World!");
//   });
// });

describe("GET /test", () => {
  it("test!", async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, test!");
  });
});
