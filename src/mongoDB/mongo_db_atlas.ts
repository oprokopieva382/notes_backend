import { Collection, Db, MongoClient } from "mongodb";
import {
  NoteMongoDBType,
  TokenMongoDBType,
  UserMongoDBType,
} from "./mongo_db_types";
import { SETTINGS } from "../settings";
import { logger } from "../utils/logger";

let client: MongoClient = {} as MongoClient;
export let db: Db = {} as Db;
export let notesCollection: Collection<NoteMongoDBType> =
  {} as Collection<NoteMongoDBType>;
export let usersCollection: Collection<UserMongoDBType> =
  {} as Collection<UserMongoDBType>;
export let tokenBlackListCollection: Collection<TokenMongoDBType> =
  {} as Collection<TokenMongoDBType>;

export const ConnectMongoDB = async () => {
  try {
    client = new MongoClient(SETTINGS.MONGO_DB_ATLAS);
    await client.connect();
    logger.info("Connected to MongoDB Atlas");

    db = client.db(SETTINGS.DB_NAME);
    usersCollection = db.collection(SETTINGS.USERS_COLLECTION);
    notesCollection = db.collection(SETTINGS.NOTES_COLLECTION);
    tokenBlackListCollection = db.collection(
      SETTINGS.BLACK_LIST_TOKEN_COLLECTION
    );

    return true;
  } catch (error) {
    logger.error(`Failed to connect MongoDB: ${error}`);
    await client.close();

    return false;
  }
};
