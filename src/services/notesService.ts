import { ObjectId } from "mongodb";
import { NoteInputModel } from "../models";
import { notesRepository } from "../repositories";

export const notesService = {
  async createNote(inputsData: NoteInputModel, userId: string) {
    const { title, isDone = false } = inputsData;

    const newNote = {
      _id: new ObjectId(),
      userId,
      title,
      isDone,
      createdAt: new Date().toISOString(),
    };

    const noteToCreate = await notesRepository.createNote(newNote);
    return noteToCreate.insertedId
  },

  async removeNote(id: string) {
    return await notesRepository.removeNote(id);
  },

  async updateNote(id: string, inputsData: NoteInputModel) {
    return await notesRepository.updateNote(id, inputsData);
  },
};
