import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { add } from "date-fns/add";
import { UserSignUpModel } from "../models";
import { usersRepository } from "../repositories";
import { bcryptService } from "./bcryptService";

export const usersService = {
  async createUser(inputsData: UserSignUpModel) {
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

    const userToCreate = await usersRepository.createUser(newUser);
    const insertedUserId = userToCreate.insertedId;
    return await usersRepository.findUser(insertedUserId);
  },

  async removeUser(id: string) {
    return await usersRepository.removeUser(id);
  },
};
