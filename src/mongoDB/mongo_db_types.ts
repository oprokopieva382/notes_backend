import { ObjectId } from "mongodb";

type ExpirationDate = Date;

type ConfirmationEmailType = {
  confirmationCode: string;
  expirationDate: ExpirationDate;
  isConfirmed: boolean;
};

export type UserMongoDBType = {
  _id: ObjectId;
  login: string;
  password: string;
  email: string;
  createdAt: string;
  emailConfirmation: ConfirmationEmailType;
};

export type NoteMongoDBType = {
  _id: ObjectId;
  userId: string;
  title: string;
  isDone?: boolean;
  createdAt: string;
};

export type TokenMongoDBType = {
  _id: ObjectId;
  token: string;
  createdAt: string;
};
