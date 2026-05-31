import type { ErrorRequestHandler } from "express";
import { env } from "../config/env";
import { HttpError } from "../utils/http-error";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error instanceof Error ? error.message : "Unexpected server error.",
    stack: env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined
  });
};

