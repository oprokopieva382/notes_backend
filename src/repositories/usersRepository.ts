import { ObjectId } from "mongodb";
import { UserMongoDBType, usersCollection } from "../mongoDB";


export const usersRepository = {
  async createUser(newUser: UserMongoDBType) {
    return await usersCollection.insertOne(newUser);
  },
  
  async removeUser(id: string) {
    return await usersCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
  },
};
