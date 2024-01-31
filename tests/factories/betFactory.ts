import { Bet } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import { createParticipant } from "./participantFactory";
import { createGame } from "./gameFactory";

export async function createBet(): Promise<Bet> {
  const participant = await createParticipant();
  const game = await createGame();
  const bet = await prisma.bet.create({
    data: {
      homeTeamScore: faker.number.int({ max: 100 }),
      awayTeamScore: faker.number.int({ max: 100 }),
      amountBet: faker.number.int({ min: 1, max: 1000000 }),
      gameId: game.id,
      participantId: participant.id,
    },
  });

  return bet;
}
