import { NextFunction, Request, Response } from "express";
import i18next from "../i18n";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";
import redisClient from "../redisClient";

export const isAuthorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    const token = req.headers.authorization.split(" ")[1];

    const userId = await jwtService.getUserIdByAccessToken(token);

    if (!userId) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    let authorizedUser;
    const cachedUser = await redisClient.get(`user:${userId}`);

    if (!cachedUser) {
      authorizedUser = await usersQuery.getUserById(userId);
      if (!authorizedUser) {
        throw ApiError.UnauthorizedError(i18next.t("401"), [
          i18next.t("ns2:401_auth"),
        ]);
      }
      await redisClient.set(`user:${userId}`, JSON.stringify(authorizedUser), {
        EX: 3600, // Cache for 1 hour
      });
    } else {
      authorizedUser = JSON.parse(cachedUser);
    }

    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
