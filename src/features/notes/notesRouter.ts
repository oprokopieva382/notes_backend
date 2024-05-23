import { Router } from "express";
import { notesController } from "./notesController";

export const notesRouter = Router()

notesRouter.get("/", notesController.getNotes);
notesRouter.get("/:id", notesController.getNoteById);
notesRouter.post("/", notesController.createNote);
notesRouter.put("/:id", notesController.updateNote);
notesRouter.delete("/:id", notesController.deleteNote);