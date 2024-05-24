import { Router } from "express";
import { notesController } from "./notesController";
import {
  userAuthorizationMiddleware,
  validateNoteInputs,
} from "../../middlewares";

export const notesRouter = Router();

notesRouter.get("/", userAuthorizationMiddleware, notesController.getNotes);
notesRouter.get(
  "/:id",
  userAuthorizationMiddleware,
  notesController.getNoteById
);
notesRouter.post(
  "/",
  userAuthorizationMiddleware,
  validateNoteInputs,
  notesController.createNote
);
notesRouter.put(
  "/:id",
  userAuthorizationMiddleware,
  notesController.updateNote
);
notesRouter.delete(
  "/:id",
  userAuthorizationMiddleware,
  notesController.deleteNote
);
