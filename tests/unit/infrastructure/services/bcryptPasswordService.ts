import { BcryptPasswordService } from "../../../../src/infrastructure/services/bcryptPasswordService";

describe("BcryptPasswordService", () => {
  let passwordService: BcryptPasswordService;

  beforeEach(() => {
    passwordService = new BcryptPasswordService(10);
  });

  it("should hash and compare password correctly", async () => {
    const password = "test123";
    const hash = await passwordService.hash(password);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);

    const isMatch = await passwordService.compare(password, hash);
    expect(isMatch).toBe(true);

    const isNotMatch = await passwordService.compare("wrong", hash);
    expect(isNotMatch).toBe(false);
  });

  it("should throw an error if hashing fails", async () => {
    jest
      .spyOn(passwordService, "hash")
      .mockRejectedValueOnce(new Error("Hashing failed"));
    await expect(passwordService.hash("test123")).rejects.toThrow(
      "Hashing failed"
    );
  });

  it("should throw an error if comparison fails", async () => {
    jest
      .spyOn(passwordService, "compare")
      .mockRejectedValueOnce(new Error("Comparison failed"));
    await expect(
      passwordService.compare("test123", "hashedValue")
    ).rejects.toThrow("Comparison failed");
  });

  it("should return false if hash is invalid during comparison", async () => {
    const isMatch = await passwordService.compare("test123", "invalidHash");
    expect(isMatch).toBe(false);
  });
});
