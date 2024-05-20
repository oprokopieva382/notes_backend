import { Router } from "express";

export const notesRouter = Router()

notesRouter.get("/", () => {});
notesRouter.get("/id", () => {});
notesRouter.post("/", () => {});
notesRouter.put("/:id", () => {});
notesRouter.delete("/:id", () => {});