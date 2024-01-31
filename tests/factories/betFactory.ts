import { Bet } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import { createParticipant } from "./participantFactory";
import { createGame } from "./gameFactory";

export async function createBet(
  givenParticipantId: number = null,
  givenGameId: number = null
): Promise<Bet> {
  let participant: any = {},
    game: any = {};
  participant.id = 1;
  game.id = 1;
  if (givenParticipantId === null) participant = await createParticipant();
  if (givenGameId === null) game = await createGame();

  const bet = await prisma.bet.create({
    data: {
      homeTeamScore: faker.number.int({ max: 100 }),
      awayTeamScore: faker.number.int({ max: 100 }),
      amountBet: faker.number.int({ min: 1, max: 1000000 }),
      gameId: givenGameId || game.id,
      participantId: givenParticipantId || participant.id,
    },
  });

  return bet;
}
