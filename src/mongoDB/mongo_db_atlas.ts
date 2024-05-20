import { Collection, Db, MongoClient } from "mongodb";
import { NoteMongoDBType, UserMongoDBType } from "./mongo_db_types";
import { SETTINGS } from "../settings";

let client: MongoClient = {} as MongoClient;
export let db: Db = {} as Db;
export let notesCollection: Collection<NoteMongoDBType> =
  {} as Collection<NoteMongoDBType>;
export let usersCollection: Collection<UserMongoDBType> =
  {} as Collection<UserMongoDBType>;

export const ConnectMongoDB = async () => {
  try {
    client = new MongoClient(SETTINGS.MONGO_DB_ATLAS);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db(SETTINGS.DB_NAME)
    usersCollection = db.collection(SETTINGS.USERS_COLLECTION);
    notesCollection = db.collection(SETTINGS.NOTES_COLLECTION);

    return true;
  } catch (error) {
    console.log("Failed to connect MongoDB:", error);
    await client.close();

    return false;
  }
};
