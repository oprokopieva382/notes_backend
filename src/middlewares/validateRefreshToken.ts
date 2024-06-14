import { NextFunction, Request, Response } from "express";
import { tokenBlackListCollection } from "../mongoDB/mongo_db_atlas";
import { jwtService } from "../application";
import { ApiError } from "../helper/api_error";
import { usersQuery } from "../query_objects";
import i18next from "../i18n";

export const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    if (typeof token !== "string") {
      throw ApiError.BadRequestError(i18next.t("400"), [
        i18next.t("ns2:400_auth"),
      ]);
    }

    const userId = await jwtService.getUserIdByRefreshToken(token);

    if (!userId) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    const authorizedUser = await usersQuery.getUserById(userId);
    if (!authorizedUser) {
      throw ApiError.UnauthorizedError(i18next.t("401"), [
        i18next.t("ns2:401_auth"),
      ]);
    }

    const invalidRefreshToken = await tokenBlackListCollection.findOne({
      token,
    });
    if (invalidRefreshToken) {
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
