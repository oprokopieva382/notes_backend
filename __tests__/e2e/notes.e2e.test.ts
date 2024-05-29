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
  });
});
