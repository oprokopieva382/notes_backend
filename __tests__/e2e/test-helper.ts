import request from "supertest";
import { app } from "../../src/app";
import { SETTINGS } from "../../src/settings";

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

    return res.body.data.accessToken;
  },

  async createNote() {
    const newNote = {
      title: "Learn e2e testing",
    };

    await this.createUser();
    const accessToken = await this.loginUser();

    await request(app)
      .post(SETTINGS.PATH.NOTES)
      .send(newNote)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(201);

      return accessToken
  },
};
