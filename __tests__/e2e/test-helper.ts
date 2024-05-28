import request from "supertest";
import { app } from "../../src/app";
import { SETTINGS } from "../../src/settings";

export const userTestManager = {
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
};
