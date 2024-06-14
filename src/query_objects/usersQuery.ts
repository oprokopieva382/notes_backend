import { ObjectId } from "mongodb";
import { usersCollection } from "../mongoDB";
import { userDTO } from "../DTO/user_dto";
import { UserViewModel } from "../models";

export const usersQuery = {
  async getUsers() {
    const users = await usersCollection.find().toArray();
    return users.map((u) => userDTO(u));
  },

  async getUserById(id: string): Promise<UserViewModel | null> {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    return user ? userDTO(user) : null;
  },
};
