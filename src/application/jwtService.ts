import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { SETTINGS } from "../settings";
import { InterfaceJwtService } from "./InterfaceJwtService";

export class JwtService implements InterfaceJwtService {
  async generateAccessToken(userId: string): Promise<{ accessToken: string }> {
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
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const rString = randomUUID();
    return jwt.sign({ userId, rString }, SETTINGS.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  }

  async getUserIdByAccessToken(token: string): Promise<string | null> {
    try {
      const result = jwt.verify(
        token,
        SETTINGS.JWT_ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      return result.userId;
    } catch (error) {
      return null;
    }
  }

  async getUserIdByRefreshToken(token: string): Promise<string | null> {
    try {
      const result = jwt.verify(
        token,
        SETTINGS.JWT_REFRESH_TOKEN_SECRET
      ) as JwtPayload;

      return result.userId;
    } catch (error) {
      return null;
    }
  }
}
