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
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Current user info
 *     description: Get information about current user
 *     security:
 *       - JWT: []
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
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user to the system
 *     description: Login user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserLogInModel"
 *     responses:
 *       201:
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
 *       400:
 *         description: If the input has incorrect values or accessToken expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
 *
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user from the system
 *     description: Logout user from the system
 *     security:
 *       - refreshToken: []
 *     responses:
 *       204:
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
 *       400:
 *         description: If the refreshToken expired or incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ResponseViewModel"
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
