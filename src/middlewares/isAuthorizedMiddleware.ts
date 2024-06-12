import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";

export const isAuthorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw ApiError.UnauthorizedError("Not authorized", ["Not authorized"]);
    }

    const token = req.headers.authorization.split(" ")[1];

    const userId = await jwtService.getUserIdByAccessToken(token);

    if (!userId) {
      throw ApiError.UnauthorizedError("Not authorized", ["Not authorized"]);
    }

    const authorizedUser = await usersQuery.getUserById(userId);
    if (!authorizedUser) {
      throw ApiError.UnauthorizedError("Not authorized", ["Not authorized"]);
    }

    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
