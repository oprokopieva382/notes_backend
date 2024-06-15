import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";
import i18next from "../i18n";
import redisClient from "../radisClient";

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

    let cachedUser = await redisClient.get(`user:${userId}`);
    console.log(cachedUser);

    let authorizedUser;
    if (cachedUser) {
      authorizedUser = JSON.parse(cachedUser);
    } else {
      authorizedUser = await usersQuery.getUserById(userId);
      console.log("authorizedUser called", authorizedUser);
      if (!authorizedUser) {
        throw ApiError.UnauthorizedError(i18next.t("401"), [
          i18next.t("ns2:401_auth"),
        ]);
      }

      await redisClient.set(`user:${userId}`, JSON.stringify(authorizedUser), {
        EX: 3600, // Cache for 1 hour
      });
    }
    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
