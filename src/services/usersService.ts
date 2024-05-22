import { ObjectId } from "mongodb";
import { UserInputModel } from "../models";
import { usersRepository } from "../repositories";

export const usersService = {
  async createUser(inputsData: UserInputModel) {
    const { login, password, email } = inputsData;

    const newUser = {
      _id: new ObjectId(),
      login,
      password,
      email,
      createdAt: new Date().toISOString(),
    };

    const userToCreate = await usersRepository.createUser(newUser);
    const insertedUserId = userToCreate.insertedId
    const createdUser = await usersRepository.findUser(insertedUserId);
    return createdUser;
  },
  async removeUser(id: string) {
    return await  usersRepository.removeUser(id);
  }
};
