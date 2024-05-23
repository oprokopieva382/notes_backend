import { Router } from "express";
import { authController } from "./authController";
import { userAuthorizationMiddleware } from "../../middlewares";

export const authRouter = Router()

authRouter.post("/login", authController.login);
authRouter.post("/logout", () => {});
authRouter.post("/sign-up", authController.signUp);
authRouter.get("/sign-up-email-confirmation/:code", authController.emailConfirmation);
authRouter.post("/sign-up-email-resending", authController.emailResending);
authRouter.post("/refresh-token", () => {});
authRouter.get("/me", userAuthorizationMiddleware, authController.me);