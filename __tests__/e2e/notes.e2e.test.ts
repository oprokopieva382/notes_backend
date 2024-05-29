import request from "supertest";
import {
  ConnectMongoDB,
  notesCollection,
  usersCollection,
} from "../../src/mongoDB";
import { app } from "./../../src/app";
import { SETTINGS } from "../../src/settings";
import { testManager } from "./test-helper";

describe("notes tests", () => {
  beforeAll(async () => {
    await ConnectMongoDB();
  });

  afterEach(async () => {
    //await notesCollection.drop();
    //await usersCollection.drop();
  });

  describe("CREATE NOTE", () => {
    it.skip("1 - should create note and return  status code of 201", async () => {
      await testManager.createUser();
      const accessToken = await testManager.loginUser();
      const newNote = {
        title: "Learn e2e testing",
      };

      const res = await request(app)
        .post(SETTINGS.PATH.NOTES)
        .send(newNote)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(201);

      expect(res.body.data).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        title: newNote.title,
        isDone: expect.any(Boolean),
        createdAt: expect.any(String),
      });
    });

    it.skip("2 - shouldn't create note and return  status code of 401 if unauthorized", async () => {
      await testManager.createUser();
      const accessToken = await testManager.loginUser();
      const newNote = {
        title: "Learn e2e testing",
      };

      await request(app)
        .post(SETTINGS.PATH.NOTES)
        .send(newNote)
        .set("Authorization", `Bearer ${accessToken}+1`)
        .expect(401);
    });

    it.skip("3 - shouldn't create note and return  status code of 400 if input has incorrect values", async () => {
      await testManager.createUser();
      const accessToken = await testManager.loginUser();
      const newNote = {
        title: "",
      };

      await request(app)
        .post(SETTINGS.PATH.NOTES)
        .send(newNote)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  describe("GET NOTES", () => {
    it.skip("1 - should get notes and return  status code of 200", async () => {
      const accessToken = await testManager.createNote();

      const res = await request(app)
        .get(SETTINGS.PATH.NOTES)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
    });

    it.skip("2 - shouldn't get notes and return  status code of 401 if unauthorized", async () => {
      const accessToken = await testManager.createNote();

      await request(app)
        .get(SETTINGS.PATH.NOTES)
        .set("Authorization", `Bearer ${accessToken}+1`)
        .expect(401);
    });
  });
});
