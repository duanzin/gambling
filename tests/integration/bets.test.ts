import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import app, { init } from "../../src/app";
import { createParticipant } from "../factories/participantFactory";
import { createFinishedGame, createGame } from "../factories/gameFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /bets/", () => {
  it("should return error if input is not present", async () => {
    const response = await server.post("/bets/");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when input is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/bets/").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when input is valid", () => {
    const generateValidInput = (gameId, participantId, balance) => ({
      homeTeamScore: faker.number.int({ max: 100 }),
      awayTeamScore: faker.number.int({ max: 100 }),
      amountBet: faker.number.int({ min: 1, max: balance }),
      gameId,
      participantId,
    });

    it("should respond with status 404 if participant doesnt exist", async () => {
      const game = await createGame();
      const input = generateValidInput(game.id, 999999, 1000);
      const response = await server.post(`/bets/`).send(input);

      expect(response.status).toBe(404);
    });

    it("should respond with status 404 if game doesnt exist", async () => {
      const participant = await createParticipant();
      const input = generateValidInput(
        999999,
        participant.id,
        participant.balance
      );
      const response = await server.post(`/bets/`).send(input);

      expect(response.status).toBe(404);
    });

    it("should respond with status 400 if amountBet is greater than participant balance", async () => {
      const participant = await createParticipant();
      const game = await createGame();
      const input = generateValidInput(
        game.id,
        participant.id,
        participant.balance
      );
      input.amountBet = faker.number.int({
        min: participant.balance + 1,
        max: 1000000,
      });
      const response = await server.post(`/bets/`).send(input);

      expect(response.status).toBe(400);
    });

    it("should respond with status 400 if game is is finished", async () => {
      const participant = await createParticipant();
      const game = await createFinishedGame();
      const input = generateValidInput(
        game.id,
        participant.id,
        participant.balance
      );
      const response = await server.post(`/bets/`).send(input);

      expect(response.status).toBe(400);
    });

    it("should respond with status 201 and created bet", async () => {
      const participant = await createParticipant();
      const game = await createGame();
      const input = generateValidInput(
        game.id,
        participant.id,
        participant.balance
      );
      const response = await server.post(`/bets/`).send(input);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          homeTeamScore: input.homeTeamScore,
          awayTeamScore: input.awayTeamScore,
          amountBet: input.amountBet,
          gameId: game.id,
          participantId: participant.id,
          status: "PENDING",
          amountWon: null,
        })
      );
      await cleanDb();
    });
  });
});
