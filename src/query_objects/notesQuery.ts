import { ObjectId } from "mongodb";
import { noteDTO } from "../DTO/note_dto";
import { notesCollection } from "../mongoDB";
import { NoteViewModel } from "../models";

export const notesQuery = {
  async getNotes() {
    const notes = await notesCollection.find().toArray();
    return notes.map((n) => noteDTO(n));
  },

  async getNoteById(id: string): Promise<NoteViewModel | null> {
    const note = await notesCollection.findOne({ _id: new ObjectId(id) });
    return note ? noteDTO(note) : null;
  },
};
