import request from "supertest";
import { app } from "../../src/app";
import { SETTINGS } from "../../src/settings";
import { tokenBlackListCollection } from "../../src/mongoDB/mongo_db_atlas";
import { ObjectId } from "mongodb";

export const testManager = {
  async createUser() {
    const newUser = {
      login: "clara",
      password: "clara1030",
      email: "clara@gmail.com",
    };

    const res = await request(app)
      .post(SETTINGS.PATH.USERS)
      .send(newUser)
      .auth("admin", "securetarget");

    return res.body.data;
  },

  async getUser() {
    const res = await request(app)
      .get(SETTINGS.PATH.USERS)
      .auth("admin", "securetarget");
    return res.body.data;
  },

  async loginUser() {
    const loginInput = {
      login: "clara",
      password: "clara1030",
    };

    const res = await request(app)
      .post(`${SETTINGS.PATH.AUTH}/login`)
      .send(loginInput)
      .expect(201);

    const cookies = res.headers["set-cookie"];
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];

    const refreshToken = cookieArray
      .find((cookie: string) => cookie.startsWith("refreshToken="))
      .split(";")[0]
      .split("=")[1];

    return { res, refreshToken };
  },

  async createNote() {
    const newNote = {
      title: "Learn e2e testing",
    };

    await this.createUser();
    const { res, refreshToken } = await this.loginUser();
    const accessToken = res.body.data.accessToken

    const responseNoteData = await request(app)
      .post(SETTINGS.PATH.NOTES)
      .send(newNote)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(201);

    return { accessToken, responseNoteData };
  },

  async addToBlacklistToken(refreshToken: string) {
    const tokenToMark = {
      _id: new ObjectId(),
      token: refreshToken,
      createdAt: new Date().toISOString(),
    };
    return await tokenBlackListCollection.insertOne(tokenToMark);
  },
};
