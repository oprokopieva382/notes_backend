import { ObjectId } from "mongodb";
import { UserMongoDBType, usersCollection } from "../mongoDB";


export const usersRepository = {
  async createUser(newUser: UserMongoDBType) {
    return await usersCollection.insertOne(newUser);
  },
  async findUser(userId: ObjectId): Promise<UserMongoDBType | null> {
    return await usersCollection.findOne({
      _id: userId,
    });
  },

  async removeUser(id: string) {
    return await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
  },
};
