import { ObjectId } from "mongodb";
import { UserMongoDBType, usersCollection } from "../mongoDB";

export const authRepository = {
  async findUserByEmail(email: string): Promise<UserMongoDBType | null> {
    const user = await usersCollection.findOne({
      email,
    });
    return user ? user : null;
  },

  async findUserByCode(code: string): Promise<UserMongoDBType | null> {
    const user = await usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });
    return user ? user : null;
  },

  async confirmUser(id: ObjectId): Promise<UserMongoDBType | null> {
    const user = await usersCollection.findOneAndUpdate(
      { _id: id },
      { $set: { "emailConfirmation.isConfirmed": true } },
      { returnDocument: "after" }
    );
    return user;
  },
};
