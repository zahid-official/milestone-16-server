import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  // Zod Validation Error Handling
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: error.issues,
      },
    });
  }

  // mongoose validation error
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }

  // mongoDB duplicate key error
  if (error.name === "MongoServerError" && error.code === 11000) {
    return res.status(400).json({
      message: "Duplicate key error",
      success: false,
      error: {
        name: error.name,
        message: `Duplicate value for field ${Object.keys(error.keyValue).join(
          ", "
        )}`,
        keyValue: error.keyValue,
      },
    });
  }

  // Fallback for others
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong",
    success: false,
    error: {
      name: error.name || "InternalServerError",
      description: error.description || "An unexpected error occurred.",
      type: error.type,
    },
  });
};

export default globalErrorHandler;
