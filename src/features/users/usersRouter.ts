import { Router } from "express";
import { authAdminMiddleware } from "../../middlewares";
import { usersController } from "./usersController";

export const usersRouter = Router();

usersRouter.get("/", authAdminMiddleware, usersController.getUsers);
usersRouter.post("/", authAdminMiddleware, usersController.createUser);
usersRouter.delete("/:id", authAdminMiddleware, usersController.deleteUser);
