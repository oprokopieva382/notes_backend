import { ObjectId } from "mongodb";
import { UserMongoDBType, usersCollection } from "../mongoDB";

export const authRepository = {
  async findUserByEmail(email: string): Promise<UserMongoDBType | null> {
    const user = await usersCollection.findOne({
      email,
    });
    return user ? user : null;
  },

  async findUserByLogin(login: string): Promise<UserMongoDBType | null> {
    const user = await usersCollection.findOne({
      login,
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
    return await usersCollection.findOneAndUpdate(
      { _id: id },
      { $set: { "emailConfirmation.isConfirmed": true } },
      { returnDocument: "after" }
    );
  },

  async updateConfirmationCode(id: ObjectId, code: string): Promise<Boolean> {
    const user = await usersCollection.updateOne(
      { _id: id },
      { $set: { "emailConfirmation.confirmationCode": code } }
    );
    return !!user.modifiedCount;
  },
};
