import { NextFunction, Response, Request } from "express";
import { ApiError } from "../helper/api_error";
import { SETTINGS } from "../settings";

export const authAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers["authorization"] as string;
  if (!auth) {
    throw ApiError.UnauthorizedError("Not authorized", ["You are not authorized for this action"]);
  }

//   const bufEncoded = Buffer.from(auth.slice(6), "base64");
//   const decodedAuth = bufEncoded.toString("utf8");

  const bufDecoded = Buffer.from(SETTINGS.ADMIN_AUTH, "utf8");
  const encodedAuth = bufDecoded.toString("base64");

  if (auth.slice(6) !== encodedAuth || auth.slice(0, 6) !== "Basic ") {
    throw ApiError.UnauthorizedError("Not authorized", [
      "You are not authorized for this action",
    ]);
  }
  next();
};
