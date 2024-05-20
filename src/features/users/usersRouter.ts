import { Router } from "express";
import { usersController } from "./usersController";
import { authAdminMiddleware } from "../../middlewares";

export const usersRouter = Router();

usersRouter.get("/", authAdminMiddleware, usersController.getUsers);
usersRouter.post("/", authAdminMiddleware, usersController.createUser);
usersRouter.delete("/:id", authAdminMiddleware, usersController.deleteUser);
