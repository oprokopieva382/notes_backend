import { Router } from "express";
import { authController } from "./authController";
import {
  isAuthorizedMiddleware,
  validateLoginInputs,
  validateRefreshToken,
  validateSignUpInputs,
} from "../../middlewares";

export const authRouter = Router();
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
 *           $ref: '#/components/schemas/UserViewModel'
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *     UserViewModel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         login:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 */

 /**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Current user info
 *     description: Get information about current user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *       401:
 *         description: Unauthorized
   *       content:
   *          application/json:
   *             schema:
   *                $ref: "#components/schemas/ResponseViewModel"
   *
   */
  

authRouter.post("/login", validateLoginInputs, authController.login);
authRouter.post("/logout", validateRefreshToken, authController.logout);
authRouter.post("/sign-up", validateSignUpInputs, authController.signUp);
authRouter.get(
  "/sign-up-email-confirmation/:code",
  authController.emailConfirmation
);
authRouter.post("/sign-up-email-resending", authController.emailResending);
authRouter.post(
  "/refresh-token",
  validateRefreshToken,
  authController.refreshToken
);

authRouter.get("/me", isAuthorizedMiddleware, authController.me);
