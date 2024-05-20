import { Router } from "express";
import { usersController } from "./usersController";

export const usersRouter = Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.createUser);
usersRouter.delete("/:id", usersController.deleteUser);
