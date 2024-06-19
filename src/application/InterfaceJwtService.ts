export interface InterfaceJwtService {
  generateAccessToken(userId: string): Promise<{ accessToken: string }>;
  generateRefreshToken(userId: string): Promise<string>;
  getUserIdByAccessToken(token: string): Promise<string | null>;
  getUserIdByRefreshToken(token: string): Promise<string | null>;
}
