import { ObjectId } from "mongodb";
import { NoteMongoDBType, notesCollection } from "../mongoDB";
import { NoteInputModel } from "../models";

export const notesRepository = {
  async createNote(newNote: NoteMongoDBType) {
    return await notesCollection.insertOne(newNote);
  },

  async findNote(noteId: ObjectId): Promise<NoteMongoDBType | null> {
    return await notesCollection.findOne({
      _id: noteId,
    });
  },

  async removeNote(noteId: string): Promise<NoteMongoDBType | null> {
    return await notesCollection.findOneAndDelete({
      _id: new ObjectId(noteId),
    });
  },

  async updateNote(
    noteId: string,
    inputsData: NoteInputModel
  ): Promise<NoteMongoDBType | null> {
    return await notesCollection.findOneAndUpdate(
      { _id: new ObjectId(noteId) },
      { $set: { ...inputsData } },
      { returnDocument: "after" }
    );
  },
};
