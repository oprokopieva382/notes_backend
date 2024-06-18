import { ObjectId } from "mongodb";
import { NoteInputModel } from "../models";
import { notesRepository } from "../repositories";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export const notesService = {
  async createNote(inputsData: NoteInputModel, userId: string) {
    const metricsLabels = {
      operation: "createNote",
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    const { title, isDone = false } = inputsData;

    const newNote = {
      _id: new ObjectId(),
      userId,
      title,
      isDone,
      createdAt: new Date().toISOString(),
    };
    try {
      const noteToCreate = await notesRepository.createNote(newNote);
      timer({ ...metricsLabels, success: "true" });
      return { ...newNote, _id: noteToCreate.insertedId };
    } catch (error) {
      timer({ ...metricsLabels, success: "false" });
      throw error;
    }
  },

  async removeNote(id: string) {
    return await notesRepository.removeNote(id);
  },

  async updateNote(id: string, inputsData: NoteInputModel) {
    return await notesRepository.updateNote(id, inputsData);
  },
};
