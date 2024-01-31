import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createParticipant } from "../factories/participantFactory";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /participants/", () => {
  it("should respond with status 200 and empty array when no participants are found", async () => {
    const response = await server.get(`/participants/`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and array of participants", async () => {
    await createParticipant();
    const response = await server.get(`/participants/`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          name: expect.any(String),
          balance: expect.any(Number),
        }),
      ])
    );
  });
});

describe("POST /participants/", () => {
  it("should return error if input is not present", async () => {
    const response = await server.post("/participants/");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when input is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/participants/").send(invalidBody);

    expect(response.status).toBe(422);
  });
  describe("when input is valid", () => {
    const generateValidInput = () => ({
      name: faker.string.alpha(),
      balance: faker.number.int({ min: 1000, max: 1000000 }),
    });
    it("should respond with status 201 and created participant", async () => {
      const input = generateValidInput();
      const response = await server.post(`/participants/`).send(input);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          name: input.name,
          balance: input.balance,
        })
      );
    });
  });
});
