import { NextFunction, Request, Response } from "express";
import { usersService } from "../../services";
import { UserSignUpModel, UserViewModel} from "../../models";
import { ApiError } from "../../helper/api_error";
import { usersQuery } from "../../query_objects";
import { formatResponse } from "../../utils/responseFormatter";
import { userDTO } from './../../DTO/user_dto';

export const usersController = {
  getUsers: async (
    req: Request,
    res: Response<UserViewModel>,
    next: NextFunction
  ) => {
    try {
      const result = await usersQuery.getUsers();

      if (!result) {
        throw ApiError.NotFoundError("Users not found");
      }

      formatResponse(res, 200, result, "Users retrieved successfully");
    } catch (error) {
      next(error);
    }
  },

  createUser: async (
    req: Request<{}, {}, UserSignUpModel>,
    res: Response<UserViewModel>,
    next: NextFunction
  ) => {
    try {
      const result = await usersService.createUser(req.body);

      if (!result) {
        throw ApiError.NotFoundError("Created user not found");
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
        throw ApiError.NotFoundError("User to delete is not found", [
          `User with id ${req.params.id} does not exist`,
        ]);
      }
      
      formatResponse(res, 204, {}, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
