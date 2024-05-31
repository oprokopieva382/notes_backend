import request from "supertest";
import {
  ConnectMongoDB,
  notesCollection,
  usersCollection,
} from "../../src/mongoDB";
import { app } from "./../../src/app";
import { SETTINGS } from "../../src/settings";
import { testManager } from "./test-helper";
import { tokenBlackListCollection } from "../../src/mongoDB/mongo_db_atlas";

describe("auth tests", () => {
  beforeAll(async () => {
    await ConnectMongoDB();
  });

  afterEach(async () => {
    await notesCollection.drop();
    await usersCollection.drop();
    await tokenBlackListCollection.drop();
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

    it("2 - shouldn't login user and return status code of 401 if unauthorized", async () => {
      await testManager.createUser();

      const loginInput = {
        login: "clara",
        password: "clara10301", //wrong password
      };

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/login`)
        .send(loginInput)
        .expect(401);
    });

    it("3 - shouldn't login user and return  status code of 400 if input has incorrect values", async () => {
      await testManager.createUser();

      const loginInput = {
        login: "claraclaraclaraclaraclaraclaraclaraclara", //incorrect input, maxLength: 15
        password: "clara1030",
      };

      const res = await request(app)
        .post(`${SETTINGS.PATH.AUTH}/login`)
        .send(loginInput)
        .expect(400);
    });
  });

  describe("AUTH ME", () => {
    it("1 - should auth user and return status code of 200", async () => {
      await testManager.createUser();

      const { res, refreshToken } = await testManager.loginUser();
      const accessToken = res.body.data.accessToken;

      const response = await request(app)
        .get(`${SETTINGS.PATH.AUTH}/me`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.data).toEqual({
        id: expect.any(String),
        login: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
      });
    });

    it("2 - shouldn't auth user and return status code of 401 if unauthorized", async () => {
      await testManager.createUser();

      const { res, refreshToken } = await testManager.loginUser();
      const accessToken = res.body.data.accessToken;

      await request(app)
        .get(`${SETTINGS.PATH.AUTH}/me`)
        .set("Authorization", `Bearer ${accessToken}+1`)
        .expect(401);
    });
  });

  describe("LOGOUT USER", () => {
    it("1 - should logout user and return status code of 204", async () => {
      await testManager.createUser();
      const { res, refreshToken } = await testManager.loginUser();

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/logout`)
        .set("Cookie", `refreshToken=${refreshToken}`)
        .expect(204);
    });

    it("2 - shouldn't logout user and return status code of 401 if unauthorized", async () => {
      await testManager.createUser();
      const { res, refreshToken } = await testManager.loginUser();
      await testManager.addToBlacklistToken(refreshToken);

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/logout`)
        .set("Cookie", `refreshToken=${refreshToken}`)
        .expect(401);
    });
  });

  describe("SIGN UP", () => {
    it("1 - should sign up user and return status code of 204", async () => {
      const newUser = {
        login: "clara",
        password: "clara1030",
        email: "clara@gmail.com",
      };

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/sign-up`)
        .send(newUser)
        .expect(204);
    });

    it("2 - shouldn't sign up and return status code of 400 if invalid inputs", async () => {
      const newUser = {
        login: "clara",
        password: "clara1030",
        email: "clara", //not valid email, should be in pattern: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
      };

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/sign-up`)
        .send(newUser)
        .expect(400);
    });
  });

  describe("SIGN UP EMAIL CONFIRMATION", () => {
    it("1 - should confirm user sing up by email link and return status code of 204", async () => {
      const code = await testManager.getConfirmCode();

      await request(app)
        .get(`${SETTINGS.PATH.AUTH}/sign-up-email-confirmation/${code}`)
        .expect(204);
    });

    it("2 - shouldn't confirm user sing up by email link and return status code of 400 if the confirmation code is incorrect", async () => {
      const code = "6654cc84aa3424d5f961995b"; //incorrect code

      await request(app)
        .get(`${SETTINGS.PATH.AUTH}/sign-up-email-confirmation/${code}`)
        .expect(400);
    });
  });

  describe("REFRESH TOKEN", () => {
    it("1 - should request new refreshToken, return new accessToken & status code of 200", async () => {
      await testManager.createUser();
      const { res, refreshToken } = await testManager.loginUser();

      const response = await request(app)
        .post(`${SETTINGS.PATH.AUTH}/refresh-token`)
        .set("Cookie", `refreshToken=${refreshToken}`)
        .set("Authorization", `Bearer ${res.body.data.accessToken}`)
        .expect(200);

      expect(response.body.data).not.toEqual({
        accessToken: res.body.data.accessToken,
      });
    });

    it("2 - should request new refreshToken but request failed as unauthorized user, return status code of 401", async () => {
      await testManager.createUser();
      const { res, refreshToken } = await testManager.loginUser();

      await request(app)
        .post(`${SETTINGS.PATH.AUTH}/refresh-token`)
        .set("Cookie", `refreshToken=${refreshToken}+1`)
        .set("Authorization", `Bearer ${res.body.data.accessToken}+1`)
        .expect(401);
    });
  });
});
