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
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/UserViewModel"
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               success:
 *                 value:
 *                   status: 200
 *                   data: [
 *                     {
 *                       id: "559f8efc4eee1938b198aa1e",
 *                       login: "kevin1985",
 *                       email: "kevin@gmail.com",
 *                       createdAt: "2023-01-01T00:00:00Z"
 *                     },
 *                     {
 *                       id: "123f8efc4eee1938b198aa1e",
 *                       login: "lory1980",
 *                       email: "lory@gmail.com",
 *                       createdAt: "2023-02-01T00:00:00Z"
 *                     }
 *                   ]
 *                   message: "User data retrieved successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
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
 *             $ref: "#/components/schemas/UserSignUpModel"
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   $ref: "#/components/schemas/UserViewModel"
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               success:
 *                 value:
 *                   status: 201
 *                   data:
 *                     id: "559f8efc4eee1938b198aa1e"
 *                     login: "kevin1985"
 *                     email: "kevin@gmail.com"
 *                     createdAt: "2023-01-01T00:00:00Z"
 *                   message: "User created successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
 *       400:
 *         description: If the input has incorrect values
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: ["email must be a valid email address"]
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by id
 *     description: Admin can delete user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *            type: string
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               not found:
 *                 value:
 *                   status: 404
 *                   data: {}
 *                   message: "User to delete is not found"
 *                   errors: ["User with id 6654f93acfcdc65a610ed081 does not exist"]
 */

usersRouter.get("/", isAdminMiddleware, usersController.getUsers);
usersRouter.post(
  "/",
  isAdminMiddleware,
  validateSignUpInputs,
  usersController.createUser,
);
usersRouter.delete("/:id", isAdminMiddleware, usersController.deleteUser);
