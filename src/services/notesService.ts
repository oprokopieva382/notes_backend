import { ObjectId } from "mongodb";
import { NoteInputModel } from "../models";
import { notesRepository } from "../repositories";

export const notesService = {
  async createNote(inputsData: NoteInputModel) {
    const { title, isDone = false } = inputsData;

    const newNote = {
      _id: new ObjectId(),
      userId: "123456789", //update later
      title,
      isDone,
      createdAt: new Date().toISOString(),
    };

    const noteToCreate = await notesRepository.createNote(newNote);
    const insertedNoteId = noteToCreate.insertedId;
    const createdNote = await notesRepository.findNote(insertedNoteId);
    return createdNote;
  },
  //   async removeUser(id: string) {
  //     return await usersRepository.removeUser(id);
  //   },
};
