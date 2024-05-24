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
      throw ApiError.UnauthorizedError("Not authorized", [
        "You are not authorized for this action",
      ]);
    }

    const token = req.headers.authorization.split(" ")[1];

    const userId = await jwtService.getUserIdByAccessToken(token);

    if (!userId) {
      throw ApiError.UnauthorizedError("Not authorized", [
        "Authorization failed. Access token is incorrect or expired",
      ]);
    }

    const authorizedUser = await usersQuery.getUserById(userId);
    if (!authorizedUser) {
      throw ApiError.UnauthorizedError("Not authorized", [
        "Authorization failed. Can't find user with such id",
      ]);
    }

    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
