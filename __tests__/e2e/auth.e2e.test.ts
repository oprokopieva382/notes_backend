import request from "supertest";
import {
  ConnectMongoDB,
  notesCollection,
  usersCollection,
} from "../../src/mongoDB";
import { app } from "./../../src/app";
import { SETTINGS } from "../../src/settings";
import { testManager } from "./test-helper";

describe("auth tests", () => {
  beforeAll(async () => {
    await ConnectMongoDB();
  });

  afterEach(async () => {
    await notesCollection.drop();
    await usersCollection.drop();
  });

  describe("LOGIN USER", () => {
    it("1 - should login user and return status code of 201", async () => {
      await testManager.createUser();

      const loginInput = {
        login: "clara",
        password: "clara1030",
      };

      const res = await request(app)
        .post(`${SETTINGS.PATH.AUTH}/login`)
        .send(loginInput)
        .expect(201);

      expect(res.body.data).toEqual({
        accessToken: expect.any(String),
      });
    });
  });
});
