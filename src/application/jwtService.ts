import jwt, { JwtPayload } from "jsonwebtoken";
import { SETTINGS } from "../settings";

export const jwtService = {
  async generateAccessToken(userId: string) {
    const aToken = jwt.sign({ userId }, SETTINGS.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return {
      accessToken: aToken,
    };
  },

  async generateRefreshToken(userId: string) {
    const rToken = jwt.sign({ userId }, SETTINGS.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return {
      accessToken: rToken,
    };
  },
};
