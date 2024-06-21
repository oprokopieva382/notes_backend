import { NextFunction, Request, Response } from "express";
import i18next from "../../i18n";
import { usersService } from "../../services";
import { UserSignUpModel, UserViewModel } from "../../models";
import { ApiError } from "../../helper/api_error";
import { usersQuery } from "../../query_objects";
import { formatResponse } from "../../utils/responseFormatter";
import { userDTO } from "./../../DTO/user_dto";

export const usersController = {
  getUsers: async (
    req: Request,
    res: Response<UserViewModel>,
    next: NextFunction,
  ) => {
    try {
      const result = await usersQuery.getUsers();

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"));
      }

      formatResponse(res, 200, result, "Users retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  createUser: async (
    req: Request<{}, {}, UserSignUpModel>,
    res: Response<UserViewModel>,
    next: NextFunction,
  ) => {
    try {
      const result = await usersService.createUser(req.body);

      if (!result) {
        throw ApiError.NotFoundError(i18next.t("404"));
      }

      formatResponse(res, 201, userDTO(result), "User created successfully");
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToRemove = await usersService.removeUser(req.params.id);

      if (!userToRemove) {
        throw ApiError.NotFoundError(i18next.t("404"), [
          i18next.t("ns2:404_auth"),
        ]);
      }

      formatResponse(res, 204, {}, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
