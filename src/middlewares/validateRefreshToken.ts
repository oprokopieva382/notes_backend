import { NextFunction, Request, Response } from "express";
import { tokenBlackListCollection } from "../mongoDB/mongo_db_atlas";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";

export const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    console.log(token);
    if (!token) {
      throw ApiError.UnauthorizedError("Not authorized", [
        "You are not authorized for this action",
      ]);
    }

    if (typeof token !== "string") {
      throw ApiError.BadRequestError("Not authorized", [
        "Authorization failed. Refresh token must be a string",
      ]);
    }

    const userId = await jwtService.getUserIdByRefreshToken(token);

    if (!userId) {
      throw ApiError.UnauthorizedError("Not authorized", [
        "Authorization failed. Refresh token is incorrect or expired",
      ]);
    }

    const authorizedUser = await usersQuery.getUserById(userId);
    if (!authorizedUser) {
      throw ApiError.UnauthorizedError("Not authorized", [
        "Authorization failed. Can't find user with such id",
      ]);
    }

     const invalidRefreshToken = await tokenBlackListCollection.findOne({token});
     if (invalidRefreshToken) {
       throw ApiError.UnauthorizedError("Not authorized", [
         "Authorization failed. We can't use this refresh token",
       ]);
     }

    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
