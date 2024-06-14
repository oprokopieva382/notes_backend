import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helper/api_error";
import { formatResponse } from "../utils/responseFormatter";

export const errorHandlerMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return formatResponse(res, err.status, {}, err.message, err.errors);
  }
  return formatResponse(res, 500, {}, "Internal Server Error", [err.message]);
};
