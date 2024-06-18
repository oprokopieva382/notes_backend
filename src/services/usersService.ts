import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { add } from "date-fns/add";
import { UserSignUpModel } from "../models";
import { usersRepository } from "../repositories";
import { bcryptService } from "./bcryptService";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const usersService = {
  async createUser(inputsData: UserSignUpModel) {
    const metricsLabels = {
      operation: "createUser",
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    const { login, password, email } = inputsData;
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
        isConfirmed: true,
      },
    };
    try {
      const userToCreate = await usersRepository.createUser(newUser);
      timer({ ...metricsLabels, success: "true" });
      return { ...newUser, _id: userToCreate.insertedId };
    } catch (error) {
      timer({ ...metricsLabels, success: "false" });
      throw error;
    }
  },

  async removeUser(id: string) {
    return await usersRepository.removeUser(id);
  },
};
