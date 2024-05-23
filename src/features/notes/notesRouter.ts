import { Router } from "express";
import { notesController } from "./notesController";
import { userAuthorizationMiddleware } from "../../middlewares";

export const notesRouter = Router();

notesRouter.get("/", userAuthorizationMiddleware, notesController.getNotes);
notesRouter.get(
  "/:id",
  userAuthorizationMiddleware,
  notesController.getNoteById
);
notesRouter.post("/", userAuthorizationMiddleware, notesController.createNote);
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
