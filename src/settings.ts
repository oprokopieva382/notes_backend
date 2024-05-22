import { config } from "dotenv";
config();

export const SETTINGS = {
  PORT: process.env.PORT || 3004,
  MONGO_DB_ATLAS: process.env.MONGO_DB_ATLAS || "",
  DB_NAME: process.env.DB_NAME || "",
  NOTES_COLLECTION: process.env.NOTES_COLLECTION || "",
  USERS_COLLECTION: process.env.USERS_COLLECTION || "",
  ADMIN_AUTH: process.env.ADMIN_AUTH || "",
  REGISTRATION_EMAIL: process.env.REGISTRATION_EMAIL || "",
  REGISTRATION_PASS: process.env.REGISTRATION_PASS || "",
  API_URL: process.env.API_URL || "",
  CLIENT_URL: process.env.CLIENT_URL || "",
  PATH: {
    USERS: "/users",
    NOTES: "/notes",
    AUTH: "/auth",
  },
};
