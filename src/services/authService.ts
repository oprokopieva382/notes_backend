import { ObjectId } from "mongodb";
import { ApiError } from "../helper/api_error";
import { UserInputModel } from "../models";
import { authRepository, usersRepository } from "../repositories";
import { bcryptService } from "./bcryptService";
import { randomUUID } from "crypto";
import { add } from "date-fns/add";
import { emailAdapter } from "../adapters";
import { SETTINGS } from "./../settings";

export const authService = {
  async signUp(data: UserInputModel) {
    const { login, password, email } = data;
    const user = await authRepository.findUserByEmail(email);
    if (user) {
      return ApiError.BadRequestError("User already exist", [
        `Can't sign up, user with ${email} already exist`,
      ]);
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
      throw ApiError.BadRequestError("Confirmation failed", [
        `Can't confirm user registration, no user found in the system`,
      ]);
    }

    return authRepository.confirmUser(user._id);
  },

  async emailResending(data: UserInputModel) {
    const user = await authRepository.findUserByEmail(data.email);
    console.log(user);
    if (!user) {
      throw ApiError.BadRequestError("Confirmation failed", [
        `Can't confirm user registration, no user found in the system`,
      ]);
    }

    const newCode = randomUUID();
    await authRepository.updateConfirmationCode(user._id, newCode);

    emailAdapter.sendEmail(data.email, newCode);

    return user;
  },
};
