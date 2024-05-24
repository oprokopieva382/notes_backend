import { Router } from "express";
import { isAdminMiddleware } from "../../middlewares";
import { usersController } from "./usersController";

export const usersRouter = Router();

usersRouter.get("/", isAdminMiddleware, usersController.getUsers);
usersRouter.post("/", isAdminMiddleware, usersController.createUser);
usersRouter.delete("/:id", isAdminMiddleware, usersController.deleteUser);
