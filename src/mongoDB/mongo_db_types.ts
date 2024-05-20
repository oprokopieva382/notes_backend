import { ObjectId } from "mongodb";

export type UserMongoDBType = {
  _id: ObjectId;
  login: string;
  password: string;
  email: string;
  createdAt: string;
};

export type NoteMongoDBType = {
  _id: ObjectId;
  userId: string;
  title: string;
  isDone: string;
  createdAt: string;
};

