import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerConfig"
import { SETTINGS } from "./settings";
import { usersRouter } from "./features/users";
import { notesRouter } from "./features/notes";
import { authRouter } from "./features/auth";
import { errorHandlerMiddleware } from "./middlewares";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.NOTES, notesRouter)
app.use(errorHandlerMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.status(200).json({ version: "1.0.0" });
});

console.log("Server started");
