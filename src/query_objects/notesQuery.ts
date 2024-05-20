import { noteDTO } from "../DTO/note_dto";
import { notesCollection } from "../mongoDB";

export const notesQuery = {
  async getNotes() {
    const notes = await notesCollection.find().toArray();
    return notes.map((n) => noteDTO(n));
  },
};
