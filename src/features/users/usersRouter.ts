import { Router } from "express";
import { isAdminMiddleware, validateSignUpInputs } from "../../middlewares";
import { usersController } from "./usersController";

export const usersRouter = Router();


/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *       - Users
 *     summary: Return users for admin
 *     description: Get all users
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 */

/**
 * @swagger
 * /users/:
 *   post:
 *     tags:
 *       - Users
 *     summary: Admin create new user
 *     description: Admin create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserInputModel"
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       400:
 *         description: If the input has incorrect values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 */

usersRouter.get("/", isAdminMiddleware, usersController.getUsers);
usersRouter.post(
  "/",
  isAdminMiddleware,
  validateSignUpInputs,
  usersController.createUser
);
usersRouter.delete("/:id", isAdminMiddleware, usersController.deleteUser);
