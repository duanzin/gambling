import { prisma } from "../config/database";

async function create(homeTeamName: string, awayTeamName: string) {
  const newGame = await prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      homeTeamName: true,
      awayTeamName: true,
      homeTeamScore: true,
      awayTeamScore: true,
      isFinished: true,
    },
  });

  return newGame;
}

async function finish(
  homeTeamScore: number,
  awayTeamScore: number,
  gameId: number
) {
  const finishedGame = await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      homeTeamScore,
      awayTeamScore,
      isFinished: true,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      homeTeamName: true,
      awayTeamName: true,
      homeTeamScore: true,
      awayTeamScore: true,
      isFinished: true,
    },
  });

  return finishedGame;
}

async function findAll() {
  const games = await prisma.game.findMany();

  return games;
}

async function findById(gameId: number) {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      Bet: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          homeTeamScore: true,
          awayTeamScore: true,
          amountBet: true,
          gameId: true,
          participantId: true,
          status: true,
          amountWon: true,
        },
      },
    },
  });

  return game;
}

export default {
  create,
  finish,
  findAll,
  findById,
};
