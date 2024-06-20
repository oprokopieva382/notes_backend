import { NextFunction, Request, Response } from "express";
import i18next from "../../i18n";
import { notesQuery } from "../../query_objects";
import { ApiError } from "../../helper/api_error";
import { formatResponse } from "../../utils/responseFormatter";
import { NoteInputModel, NoteViewModel } from "../../models";
import { notesService } from "../../services";
import { noteDTO } from "./../../DTO/note_dto";

export const notesController = {
  getNotes: async (
    req: Request,
    res: Response<NoteViewModel>,
    next: NextFunction
  ) => {
    try {
      const result = await notesQuery.getNotes();

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"));
      }

      formatResponse(res, 200, result, "Notes retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  getNoteById: async (
    req: Request,
    res: Response<NoteViewModel>,
    next: NextFunction
  ) => {
    try {
      const result = await notesQuery.getNoteById(req.params.id);

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"));
      }

      formatResponse(res, 200, result, "Note retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  createNote: async (
    req: Request<{}, {}, NoteInputModel>,
    res: Response<NoteViewModel>,
    next: NextFunction
  ) => {
    try {
      const result = await notesService.createNote(req.body, req.userId);

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"));
      }

      formatResponse(res, 201, noteDTO(result), "Note created successfully");
    } catch (error) {
      next(error);
    }
  },

  updateNote: async (
    req: Request<{ id: string }, {}, NoteInputModel>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await notesService.updateNote(req.params.id, req.body);

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"), [
          i18next.t("ns2:404_auth"),
        ]);
      }

      formatResponse(res, 201, noteDTO(result), "Note updated successfully");
    } catch (error) {
      next(error);
    }
  },

  deleteNote: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteToRemove = await notesService.removeNote(req.params.id);

      if (!noteToRemove) {
        throw ApiError.NotFoundError(i18next.t("404"), [
          i18next.t("ns2:404_auth"),
        ]);
      }

      formatResponse(res, 204, {}, "Note deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
