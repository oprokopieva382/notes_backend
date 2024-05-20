import { NextFunction, Request, Response } from "express";
import { notesQuery } from "../../query_objects";
import { ApiError } from "../../helper/api_error";
import { formatResponse } from "../../utils/responseFormatter";

export const notesController = {
  getNotes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = notesQuery.getNotes();

      if (!result) {
        throw ApiError.NotFoundError("Notes not found");
      }
      formatResponse(res, 200, result, "Notes retrieved successfully");
    } catch (error) {
      next(error);
    }
  },
};
