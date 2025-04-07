import { Response } from "express";
import { AppError } from "../errors/customErrors";

export function handleControllerError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    res
      .status(error.statusCode)
      .json({ error: error.message, code: error.code });
  } else if (error instanceof Error) {
    res
      .status(500)
      .json({ error: "Internal server error", code: "INTERNAL_ERROR" });
  } else {
    res
      .status(500)
      .json({ error: "Unknown error occurred", code: "UNKNOWN_ERROR" });
  }
}
