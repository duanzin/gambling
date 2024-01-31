import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createFinishedGame, createGame } from "../factories/gameFactory";
import app, { init } from "../../src/app";
import { createBet } from "../factories/betFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /games/", () => {
  it("should respond with status 200 and empty array when no games are found", async () => {
    await cleanDb();
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

describe("GET /games/:id", () => {
  it("should respond with status 400 when id isnt a string", async () => {
    const response = await server.get(`/games/aaa`);

    expect(response.status).toBe(400);
  });

  it("should respond with status 404 when game isnt found", async () => {
    const response = await server.get(`/games/99999999`);

    expect(response.status).toBe(404);
  });

  it("should respond with status 200 and array of games with its associated bets", async () => {
    const game = await createGame();
    await createBet(null, game.id);
    const response = await server.get(`/games/${game.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: game.id,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: game.isFinished,
      Bet: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamScore: expect.any(Number),
          awayTeamScore: expect.any(Number),
          amountBet: expect.any(Number),
          gameId: expect.any(Number),
          participantId: expect.any(Number),
          status: expect.stringMatching(/^(PENDING|WON|LOST)$/),
          amountWon: null,
        }),
      ]),
    });
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

describe("POST /games/:id/finsih", () => {
  it("should return error if input is not present", async () => {
    const response = await server.post("/games/9999999/finish");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when input is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server
      .post("/games/999999/finish")
      .send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when input is valid", () => {
    const generateValidInput = () => ({
      homeTeamScore: faker.number.int({ min: 0, max: 100 }),
      awayTeamScore: faker.number.int({ min: 0, max: 100 }),
    });

    it("should respond with status 400 when id isnt a string", async () => {
      const input = generateValidInput();
      const response = await server.post(`/games/aaa/finish`).send(input);

      expect(response.status).toBe(400);
    });

    it("should respond with status 404 when game doesnt exist", async () => {
      const input = generateValidInput();
      const response = await server.post(`/games/99999999/finish`).send(input);

      expect(response.status).toBe(404);
    });

    it("should respond with status 409 when game is already finished", async () => {
      const input = generateValidInput();
      const game = await createFinishedGame();
      const response = await server
        .post(`/games/${game.id}/finish`)
        .send(input);

      expect(response.status).toBe(409);
    });

    it("should respond with status 200 and finished game", async () => {
      const input = generateValidInput();
      const game = await createGame();
      const response = await server
        .post(`/games/${game.id}/finish`)
        .send(input);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: game.id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamName: game.homeTeamName,
          awayTeamName: game.awayTeamName,
          homeTeamScore: input.homeTeamScore,
          awayTeamScore: input.awayTeamScore,
          isFinished: true,
        })
      );
    });
  });
});
