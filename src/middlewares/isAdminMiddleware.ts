import { NextFunction, Response, Request } from "express";
import i18next from "../i18n";
import { ApiError } from "../helper/api_error";
import { SETTINGS } from "../settings";

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers["authorization"] as string;
  if (!auth) {
    throw ApiError.UnauthorizedError(i18next.t("401"), [
      i18next.t("ns2:401_admin"),
    ]);
  }

  //   const bufEncoded = Buffer.from(auth.slice(6), "base64");
  //   const decodedAuth = bufEncoded.toString("utf8");

  const bufDecoded = Buffer.from(SETTINGS.ADMIN_AUTH, "utf8");
  const encodedAuth = bufDecoded.toString("base64");

  if (auth.slice(6) !== encodedAuth || auth.slice(0, 6) !== "Basic ") {
    throw ApiError.UnauthorizedError(i18next.t("401"), [
      i18next.t("ns2:401_admin"),
    ]);
  }
  next();
};
