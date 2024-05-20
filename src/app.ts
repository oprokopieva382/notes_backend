import express from "express";
import { SETTINGS } from "./settings";
import { usersRouter } from "./features/users";
import { notesRouter } from "./features/notes";
import { authRouter } from "./features/auth";

export const app = express()

app.use(express.json())
//app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.USERS, usersRouter)
//app.use(SETTINGS.PATH.NOTES, notesRouter)

app.get("/", (req, res)=> {
    res.status(200).json({ version: "4.19.2" });
})