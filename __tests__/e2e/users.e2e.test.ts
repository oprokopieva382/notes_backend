import request from "supertest";
import { ConnectMongoDB, usersCollection } from "../../src/mongoDB";
import { app } from "./../../src/app";
import { SETTINGS } from "../../src/settings";
import { userTestManager } from "./test-helper";

describe("users tests", () => {
  beforeAll(async () => {
    await ConnectMongoDB();
  });

  afterEach(async () => {
    await usersCollection.drop();
  });

  describe("CREATE USER", () => {
    it("1 - should create user and return  status code of 201", async () => {
      const newUser = {
        login: "clara",
        password: "clara1030",
        email: "clara@gmail.com",
      };

      const res = await request(app)
        .post(SETTINGS.PATH.USERS)
        .send(newUser)
        .auth("admin", "securetarget")
        .expect(201);

      expect(res.body.data).toEqual({
        id: expect.any(String),
        login: newUser.login,
        email: newUser.email,
        createdAt: expect.any(String),
      });
    });

    it("2 - shouldn't create user and return  status code of 400", async () => {
      const newUser = {
        login: "clara",
        password: "clara1030",
        email: "clara", //invalid email
      };

      const res = await request(app)
        .post(SETTINGS.PATH.USERS)
        .send(newUser)
        .auth("admin", "securetarget")
        .expect(400);

      expect(res.body.errors.length).toBe(1);
    });

    it("3 - shouldn't create user and return  status code of 401 if user unauthorized", async () => {
      const newUser = {
        login: "clara",
        password: "clara1030",
        email: "clara@gmail.com",
      };

      const res = await request(app)
        .post(SETTINGS.PATH.USERS)
        .send(newUser)
        .auth("admin", "wrongPassword")
        .expect(401);

      expect(res.body.errors.length).toBe(1);
    });
  });

  describe("GET USERS", () => {
    it("1 - should display users for admin and return status code of 200", async () => {
      await userTestManager.createUser();

      const res = await request(app)
        .get(SETTINGS.PATH.USERS)
        .auth("admin", "securetarget")
        .expect(200);

      expect(res.body.data.length).toBe(1);
    });

    it("2 - shouldn't display users and return status code of 401 if admin unauthorized", async () => {
      await userTestManager.createUser();

      await request(app)
        .get(SETTINGS.PATH.USERS)
        .auth("admin", "wrongPassword")
        .expect(401);
    });
  });

  describe("DELETE USER", () => {
    it("1 - should delete user by ID and return status code of 204", async () => {
      await userTestManager.createUser();
      const user = await userTestManager.getUser();

      await request(app)
        .delete(`${SETTINGS.PATH.USERS}/${user[0].id}`)
        .auth("admin", "securetarget")
        .expect(204);
    });

    it("2 - shouldn't delete user by ID and return status code of 401 if admin unauthorized", async () => {
      const user = await userTestManager.getUser();

      await request(app)
        .delete(`${SETTINGS.PATH.USERS}/${user.id}`)
        .auth("admin", "wrongPassword")
        .expect(401);
    });

    it("3 - shouldn't delete user by ID and return status code of 404 ID is not exist in the system", async () => {
      const userId = "559f8efc4eee1938b198aa1e";

      await request(app)
        .delete(`${SETTINGS.PATH.USERS}/${userId}`)
        .auth("admin", "securetarget")
        .expect(404);
    });
  });
});
