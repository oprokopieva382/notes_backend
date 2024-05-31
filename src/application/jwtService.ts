import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { SETTINGS } from "../settings";

export const jwtService = {
  async generateAccessToken(userId: string) {
    const rString = randomUUID();
    const aToken = jwt.sign(
      { userId, rString },
      SETTINGS.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return {
      accessToken: aToken,
    };
  },

  async generateRefreshToken(userId: string) {
    const rString = randomUUID();
    const rToken = jwt.sign(
      { userId, rString },
      SETTINGS.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return rToken;
  },

  async getUserIdByAccessToken(token: string) {
    try {
      const result = jwt.verify(
        token,
        SETTINGS.JWT_ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      return result.userId;
    } catch (error) {
      return null;
    }
  },

  async getUserIdByRefreshToken(token: string) {
    try {
      const result = jwt.verify(
        token,
        SETTINGS.JWT_REFRESH_TOKEN_SECRET
      ) as JwtPayload;

      return result.userId;
    } catch (error) {
      return null;
    }
  },
};
