import { NoteViewModel } from "../models";
import { NoteMongoDBType } from "../mongoDB";

export const noteDTO = (note: NoteMongoDBType): NoteViewModel => {
  return {
    id: note._id.toString(),
    userId: note.userId,
    title: note.title,
    isDone: note.isDone? note.isDone : false,
    createdAt: note.createdAt,
  };
};
