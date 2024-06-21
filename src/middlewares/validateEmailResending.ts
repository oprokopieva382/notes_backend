import { NextFunction, Request, Response } from "express";
import i18next from "../i18n";
import {
  FieldValidationError,
  body,
  validationResult,
} from "express-validator";
import { ApiError } from "../helper/api_error";

export const validateEmailResending = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allBodyValidation: any[] = [];

    allBodyValidation.push(
      body("email")
        .trim()
        .isString()
        .withMessage(i18next.t("ns2:400_field_string"))
        .notEmpty()
        .withMessage(i18next.t("ns2:400_field_required"))
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .withMessage(i18next.t("ns2:400_field_invalid")),
    );

    await Promise.all(allBodyValidation.map((item) => item.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array({
        onlyFirstError: true,
      }) as FieldValidationError[];
      throw ApiError.BadRequestError(
        i18next.t("400"),
        errorMessages.map((error) => ({
          message: error.msg,
          field: error.path,
        })),
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
