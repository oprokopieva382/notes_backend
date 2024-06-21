import { UserViewModel } from "../models";
import { UserMongoDBType } from "../mongoDB";

export const userDTO = (user: UserMongoDBType): UserViewModel => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};
