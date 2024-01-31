import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createGame } from "../factories/gameFactory";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /games/", () => {
  it("should respond with status 200 and empty array when no games are found", async () => {
    const response = await server.get(`/games/`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and array of games", async () => {
    await createGame();
    const response = await server.get(`/games/`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          homeTeamScore: expect.any(Number),
          awayTeamScore: expect.any(Number),
          isFinished: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("POST /games/", () => {
  it("should return error if input is not present", async () => {
    const response = await server.post("/games/");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when input is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/games/").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when input is valid", () => {
    const generateValidInput = () => ({
      homeTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
      awayTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
    });

    it("should respond with status 201 and created game", async () => {
      const input = generateValidInput();
      const response = await server.post(`/games/`).send(input);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: input.homeTeamName,
          awayTeamName: input.awayTeamName,
          homeTeamScore: 0,
          awayTeamScore: 0,
          isFinished: false,
        })
      );
    });
  });
});
