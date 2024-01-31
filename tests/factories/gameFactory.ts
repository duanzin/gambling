import { Game } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";

export async function createGame(): Promise<Game> {
  const game = await prisma.game.create({
    data: {
      homeTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
      awayTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
    },
  });

  return game;
}

export async function createFinishedGame(): Promise<Game> {
  const game = await prisma.game.create({
    data: {
      homeTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
      awayTeamName: faker.string.alpha({ length: { min: 1, max: 50 } }),
      isFinished: true,
    },
  });

  return game;
}
