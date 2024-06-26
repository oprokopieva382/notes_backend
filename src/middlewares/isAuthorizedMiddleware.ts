import { NextFunction, Request, Response } from "express";
import i18next from "../i18n";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";

export const isAuthorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

    //getting authorizedUser from cache or DB
    const authorizedUser = await usersQuery.getUserById(userId);

    if (!authorizedUser) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    req.userId = authorizedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};
