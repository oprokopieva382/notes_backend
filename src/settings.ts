import { config } from "dotenv";
config();

export const SETTINGS = {
  PORT: process.env.PORT || 3004,
  MONGO_DB_ATLAS: process.env.MONGO_DB_ATLAS || "",
  DB_NAME: process.env.DB_NAME || "",
  NOTES_COLLECTION: process.env.NOTES_COLLECTION || "",
  USERS_COLLECTION: process.env.USERS_COLLECTION || "",
};
