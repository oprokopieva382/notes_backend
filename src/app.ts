import express from "express";

export const app = express()

app.get("/", (req, res)=> {
    res.status(200).json({ version: "4.19.2" });
})