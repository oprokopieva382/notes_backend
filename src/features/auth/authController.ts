import { NextFunction, Request, Response } from "express";
import { authService } from "../../services";
import { formatResponse } from "../../utils/responseFormatter";
import { ApiError } from "../../helper/api_error";
import { userDTO } from "../../DTO/user_dto";
import { jwtService } from "../../application";

export const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.signUp(req.body);

      formatResponse(
        res,
        204,
        {},
        "User registered and email with confirmation link sent to email"
      );
    } catch (error) {
      next(error);
    }
  },

  emailConfirmation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await authService.confirmSignUp(req.params.code);

      formatResponse(res, 204, {}, "User confirmation made successfully");
    } catch (error) {
      next(error);
    }
  },

  emailResending: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.emailResending(req.body);

      formatResponse(res, 204, {}, "Registration link resented");
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);

      if (!result.emailConfirmation.isConfirmed) {
        throw ApiError.BadRequestError("Login failed", [
          `User registration is not confirmed yet`,
        ]);
      }
      const user = userDTO(result);
      const accessToken = await jwtService.generateAccessToken(user.id);
      const refreshToken = await jwtService.generateRefreshToken(user.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });

      formatResponse(res, 201, accessToken, "User logged in successfully");
    } catch (error) {
      next(error);
    }
  },
};
