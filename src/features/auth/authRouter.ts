import { Router } from "express";
import { authController } from "./authController";
import {
  isAuthorizedMiddleware,
  validateEmailResending,
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
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/UserViewModel"
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               success:
 *                 value:
 *                   status: 200
 *                   data: [
 *                     {
 *                       id: "559f8efc4eee1938b198aa1e",
 *                       login: "kevin1985",
 *                       email: "kevin@gmail.com",
 *                       createdAt: "2023-01-01T00:00:00Z"
 *                     }]
 *                   message: "User authorized"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *       content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
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
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/LoginSuccessViewModel"
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               success:
 *                 value:
 *                   status: 201
 *                   data: [
 *                     {
 *                       accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwYjA2MGFjNzExYmQ5NzYyODBjMDEiLCJpYXQiOjE3MTY4Njg0MzQsImV4cCI6MTcxNjg3MjAzNH0.KDdKP8keCIJ7tq5Uf16luERMGnUgmD915x3xo7cDKpM",
 *                     }]
 *                   message: "User logged in successfully"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["Unauthorized"]
 *       400:
 *         description: If the input has incorrect values or accessToken expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: [{message: "min length of password 6 characters", field: "password"}]
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: In cookie client must send correct refreshToken that will be revoked
 *     description: Logout user from the system
 *     security:
 *       - refreshToken: []
 *     responses:
 *       204:
 *         description: Success
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
 */

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registration in the system. Email with confirmation code will be send to passed email address
 *     description: Registration in the system. Email with confirmation code will be send to passed email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserSignUpModel"
 *     responses:
 *       204:
 *         description: Input data is accepted. Email with confirmation code will be send to passed email address.
 *       400:
 *         description: If the inputModel has incorrect values (in particular if the user with the given email or login already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: [{message: "email must be a valid email address", field: "email"}]
 */

/**
 * @swagger
 * /auth/sign-up-email-confirmation/{code}:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Confirm user registration
 *     description: Confirm user registration
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Code that be sent via Email inside link
 *         schema:
 *            type: string
 *     responses:
 *       204:
 *         description: Email was verified. Account was activated
 *       400:
 *         description: If the confirmation code is incorrect, expired or already been applied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: ["provided code invalid"]
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Generate new pair of access and refresh tokens (in cookie client must send correct refreshToken that will be revoked after refreshing)
 *     description: Generate new pair of access and refresh tokens
 *     security:
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: Returns JWT accessToken (expired after 24 hours) in body and JWT refreshToken in cookie (http-only, secure) (expired after 30 days).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/LoginSuccessViewModel"
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               success:
 *                 value:
 *                   status: 200
 *                   data: [
 *                     {
 *                       accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjUwYjA2MGFjNzExYmQ5NzYyODBjMDEiLCJpYXQiOjE3MTY4Njg0MzQsImV4cCI6MTcxNjg3MjAzNH0.KDdKP8keCIJ7tq5Uf16luERMGnUgmD915x3xo7cDKpM",
 *                     }]
 *                   message: "New access token sent"
 *                   errors: []
 *       401:
 *         description: Unauthorized
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               unauthorized:
 *                 value:
 *                   status: 401
 *                   data: {}
 *                   message: "Not authorized"
 *                   errors: ["You are not authorized for this action"]
 */

/**
 * @swagger
 * /auth/sign-up-email-resending:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registration in the system. Re-send email with confirmation link
 *     description: Registration in the system. Re-send email with confirmation link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserEmailResending"
 *     responses:
 *       204:
 *         description: Input data is accepted. Email with confirmation code will be send to passed email address.
 *       400:
 *         description: If the input has incorrect value.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "data", "message", "errors"]
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *             examples:
 *               bad request:
 *                 value:
 *                   status: 400
 *                   data: {}
 *                   message: "Validation failed"
 *                   errors: [{message: "Email must be a valid email address", field: "email"}]
 */
authRouter.post("/login", validateLoginInputs, authController.login);
authRouter.post("/logout", validateRefreshToken, authController.logout);
authRouter.post("/sign-up", validateSignUpInputs, authController.signUp);
authRouter.get(
  "/sign-up-email-confirmation/:code",
  authController.emailConfirmation
);
authRouter.post(
  "/sign-up-email-resending",
  validateEmailResending,
  authController.emailResending
);
authRouter.post(
  "/refresh-token",
  validateRefreshToken,
  authController.refreshToken
);

authRouter.get("/me", isAuthorizedMiddleware, authController.me);
