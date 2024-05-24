import { Router } from "express";
import { notesController } from "./notesController";
import { isAuthorizedMiddleware, validateNoteInputs } from "../../middlewares";

export const notesRouter = Router();

notesRouter.get("/", isAuthorizedMiddleware, notesController.getNotes);
notesRouter.get("/:id", isAuthorizedMiddleware, notesController.getNoteById);
notesRouter.post(
  "/",
  isAuthorizedMiddleware,
  validateNoteInputs,
  notesController.createNote
);
notesRouter.put("/:id", isAuthorizedMiddleware, notesController.updateNote);
notesRouter.delete("/:id", isAuthorizedMiddleware, notesController.deleteNote);
