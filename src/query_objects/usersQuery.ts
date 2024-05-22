import { userDTO } from "../DTO/user_dto";
import { usersCollection } from "../mongoDB";

export const usersQuery = {
  async getUsers() {
    const users = await usersCollection.find().toArray();
    return users.map((u) => userDTO(u));
  },
};
