import { NextFunction, Request, Response } from "express";
import { authService } from "../../services";
import { formatResponse } from "../../utils/responseFormatter";

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
};
