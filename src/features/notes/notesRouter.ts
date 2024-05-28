import { Router } from "express";
import { notesController } from "./notesController";
import { isAuthorizedMiddleware, validateNoteInputs } from "../../middlewares";

export const notesRouter = Router();

/**
 * @swagger
 * /notes/:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Return user notes
 *     description: Get all user notes
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               success:
 *                 value:
 *                   status: 200
 *                   data: [
 *                     {
 *                        "id": "664f8efc4eee1938b198aa1e",
 *                        "userId": "664f8e7f4eee1938b198aa1d",
 *                        "title": "Learn JWT",
 *                        "isDone": true,
 *                         "createdAt": "2024-05-23T18:46:20.594Z"
 *                     },
 *                      {
 *                          "id": "6650b5e868e7854cfc56e919",
 *                          "userId": "6650b060ac711bd976280c01",
 *                          "title": "Read Promises",
 *                          "isDone": false,
 *                          "createdAt": "2024-05-24T15:44:40.903Z"
 *                      },
 *                   ]
 *                   message: "Notes retrieved successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
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
 * /notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Return note by id
 *     description: Get user note by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *            type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               success:
 *                 value:
 *                   status: 200
 *                   data: [
 *                     {
 *                        id: "664f8efc4eee1938b198aa1e",
 *                        userId: "664f8e7f4eee1938b198aa1d",
 *                        title: "Learn JWT",
 *                        isDone: true,
 *                        createdAt: "2024-05-23T18:46:20.594Z"
 *                     }]
 *                   message: "Notes retrieved successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
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
 * /notes/:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create new note
 *     description: Create new note for user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NoteInputModel"
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               success:
 *                 value:
 *                   status: 201
 *                   data: [
 *                     {
 *                       id: "664f8efc4eee1938b198aa1e",
 *                       userId: "664f8e7f4eee1938b198aa1d",
 *                       title: "Learn JWT",
 *                       isDone: true,
 *                       createdAt: "2024-05-23T18:46:20.594Z"
 *                     }
 *                   ]
 *                   message: "Note created successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
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
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: [{message: "email must be a valid email address", field: "email"}]
 */

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     tags:
 *       - Notes
 *     summary: Update note by id
 *     description: Update the note for user by id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NoteInputModel"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *            type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               success:
 *                 value:
 *                   status: 201
 *                   data: [
 *                     {
 *                       id: "664f8efc4eee1938b198aa1e",
 *                       userId: "664f8e7f4eee1938b198aa1d",
 *                       title: "Learn JWT",
 *                       isDone: true,
 *                       createdAt: "2024-05-23T18:46:20.594Z"
 *                     }]
 *                   message: "Note updated successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
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
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: [{message: "max length of title 35 characters", field: "title"}]
 */

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete note by id
 *     description: Delete the note for user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: string ID required
 *         schema:
 *            type: string
 *     security:
 *       - JWT: []
 *     responses:
 *       204:
 *         description: No content
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
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
 *               $ref: "#/components/schemas/ResponseViewNoteModel"
 *             examples:
 *               not found:
 *                 value:
 *                   status: 404
 *                   data: {}
 *                   message: "Note to delete is not found"
 *                   errors: ["Note with id 6654f93acfcdc65a610ed081 does not exist"]
 */

notesRouter.get("/", isAuthorizedMiddleware, notesController.getNotes);
notesRouter.get("/:id", isAuthorizedMiddleware, notesController.getNoteById);
notesRouter.post(
  "/",
  isAuthorizedMiddleware,
  validateNoteInputs,
  notesController.createNote
);
notesRouter.put(
  "/:id",
  isAuthorizedMiddleware,
  validateNoteInputs,
  notesController.updateNote
);
notesRouter.delete("/:id", isAuthorizedMiddleware, notesController.deleteNote);
