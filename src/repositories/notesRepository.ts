import { ObjectId } from "mongodb";
import { NoteMongoDBType, notesCollection } from "../mongoDB";

export const notesRepository = {
  async createNote(newNote: NoteMongoDBType) {
    return await notesCollection.insertOne(newNote);
  },

  async findNote(noteId: ObjectId): Promise<NoteMongoDBType | null> {
    return await notesCollection.findOne({
      _id: noteId,
    });
  },
};
