import { JWTTokenService } from "../../../../src/infrastructure/services/jwtTokenService";
import jwt from "jsonwebtoken";

describe("JWTTokenService", () => {
  let tokenService: JWTTokenService;

  beforeEach(() => {
    tokenService = new JWTTokenService("test-secret", "1h");
  });

  it("should generate a valid JWT token", () => {
    const payload = { id: "123", email: "test@example.com" };
    const token = tokenService.generateToken(payload);

    expect(token).toBeDefined();
    const decoded = jwt.verify(token, "test-secret") as any;
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);
  });
});
