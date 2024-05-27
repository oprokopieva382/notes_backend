import { Router } from "express";
import { notesController } from "./notesController";
import { isAuthorizedMiddleware, validateNoteInputs } from "../../middlewares";

export const notesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseViewModel:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         data:
 *           $ref: '#/components/schemas/NoteViewModel'
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *     NoteViewModel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         isDone:
 *           type: boolean
 *         createdAt:
 *           type: string
 *     NoteInputModel:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 35
 *           minLength: 5
 *         isDone:
 *           type: boolean
 */

/**
 * @swagger
 * /notes/:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Return user notes
 *     description: Get all user notes
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *
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
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: If the input has incorrect values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
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
 *     responses:
 *       201:
 *         description: Returns Response object with data of the newly updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: If the input has incorrect values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 */

notesRouter.get("/", isAuthorizedMiddleware, notesController.getNotes);
notesRouter.get("/:id", isAuthorizedMiddleware, notesController.getNoteById);
notesRouter.post(
  "/",
  isAuthorizedMiddleware,
  validateNoteInputs,
  notesController.createNote
);
notesRouter.put("/:id", isAuthorizedMiddleware, notesController.updateNote);
notesRouter.delete("/:id", isAuthorizedMiddleware, notesController.deleteNote);
