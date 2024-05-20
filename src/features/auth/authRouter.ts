import { Router } from "express";

export const authRouter = Router()

authRouter.post("/login", () => {});
authRouter.post("/logout", () => {});
authRouter.post("/sign-up", () => {});
authRouter.post("/sign-up-email-confirmation", () => {});
authRouter.post("/sign-up-email-resending", () => {});
authRouter.post("/refresh-token", () => {});
authRouter.get("/me", () => {});