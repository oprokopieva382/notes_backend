import { NextFunction, Request, Response } from "express";
import { notesQuery } from "../../query_objects";
import { ApiError } from "../../helper/api_error";
import { formatResponse } from "../../utils/responseFormatter";
import { NoteInputModel } from "../../models";
import { notesService } from "../../services";

export const notesController = {
  getNotes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await notesQuery.getNotes();

      if (!result) {
        throw ApiError.NotFoundError("Notes not found");
      }
      formatResponse(res, 200, result, "Notes retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  getNoteById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await notesQuery.getNoteById(req.params.id);

      if (!result) {
        throw ApiError.NotFoundError(
          `Note with id ${req.params.id} is not found`
        );
      }
      formatResponse(res, 200, result, "Note retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  createNote: async (
    req: Request<{}, {}, NoteInputModel>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await notesService.createNote(req.body);

      if (!result) {
        throw ApiError.NotFoundError(`Note can't be created`);
      }
      formatResponse(res, 201, result, "Note created successfully");
    } catch (error) {
      next(error);
    }
  },
};
