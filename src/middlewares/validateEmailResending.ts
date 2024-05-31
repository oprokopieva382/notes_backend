import { NextFunction, Request, Response } from "express";
import {
  FieldValidationError,
  body,
  validationResult,
} from "express-validator";
import { ApiError } from "../helper/api_error";

export const validateEmailResending = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allBodyValidation: any[] = [];

    allBodyValidation.push(
      body("email")
        .trim()
        .isString()
        .withMessage("Email field must be a string")
        .notEmpty()
        .withMessage("Email field is required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .withMessage("Email must be a valid email address")
    );

    await Promise.all(allBodyValidation.map((item) => item.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array({
        onlyFirstError: true,
      }) as FieldValidationError[];
      throw ApiError.BadRequestError(
        "Validation failed",
        errorMessages.map((error) => ({
          message: error.msg,
          field: error.path,
        }))
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
