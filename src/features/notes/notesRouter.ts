import { Router } from "express";
import { notesController } from "./notesController";

export const notesRouter = Router()

notesRouter.get("/", notesController.getNotes);
notesRouter.get("/id", () => {});
notesRouter.post("/", () => {});
notesRouter.put("/:id", () => {});
notesRouter.delete("/:id", () => {});