import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { add } from "date-fns/add";
import { bcryptService } from "./bcryptService";
import { tokenBlackListCollection } from "../mongoDB/mongo_db_atlas";
import { ApiError } from "../helper/api_error";
import { UserLoginModel, UserSignUpModel } from "../models";
import { authRepository, usersRepository } from "../repositories";
import { emailAdapter } from "../adapters";
import { SETTINGS } from "./../settings";
import { jwtService } from "../application";

export const authService = {
  async signUp(data: UserSignUpModel) {
    const { login, password, email } = data;
    const user = await authRepository.findUserByEmail(email);

    if (user) {
      return ApiError.BadRequestError("User already exist", ["Bad Request"]);
    }
    
    const passwordHash = await bcryptService.createHash(password);

    const newUser = {
      _id: new ObjectId(),
      login,
      password: passwordHash,
      email,
      createdAt: new Date().toISOString(),
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: false,
      },
    };

    const code = newUser.emailConfirmation.confirmationCode;

    await usersRepository.createUser(newUser);

    await emailAdapter.sendEmail(
      email,
      `${SETTINGS.API_URL}auth/sign-up-email-confirmation/${code}`
    );

    return newUser;
  },

  async confirmSignUp(code: string) {
    const user = await authRepository.findUserByCode(code);

    if (!user) {
      throw ApiError.BadRequestError("Confirmation failed", ["Bad Request"]);
    }

    return authRepository.confirmUser(user._id);
  },

  async emailResending(data: UserSignUpModel) {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user) {
      throw ApiError.BadRequestError("Confirmation failed", ["Bad Request"]);
    }

    const newCode = randomUUID();
    await authRepository.updateConfirmationCode(user._id, newCode);

    emailAdapter.sendEmail(data.email, newCode);

    return user;
  },

  async login(data: UserLoginModel) {
    const user = await authRepository.findUserByLogin(data.login);

    if (!user) {
      throw ApiError.BadRequestError("Login failed", ["Bad Request"]);
    }

    const verifyPassword = await bcryptService.verifyPassword(
      data.password,
      user.password
    );
    
    if (!verifyPassword) {
      throw ApiError.UnauthorizedError("Login failed", [`Unauthorized`]);
    }

    return user;
  },

  async addTokenToBlackList(refreshToken: string) {
    const tokenToMark = {
      _id: new ObjectId(),
      token: refreshToken,
      createdAt: new Date().toISOString(),
    };
    
    return await tokenBlackListCollection.insertOne(tokenToMark);
  },

  async refreshToken(id: string, refreshToken: string) {
    await this.addTokenToBlackList(refreshToken);

    const newAccessToken = await jwtService.generateAccessToken(id);
    const newRefreshToken = await jwtService.generateRefreshToken(id);

    return { newAccessToken, newRefreshToken };
  },

  async logout(refreshToken: string) {
    return await this.addTokenToBlackList(refreshToken);
  },
};
