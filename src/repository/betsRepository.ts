import { prisma } from "../config/database";
import { CreateBetParams } from "../protocol/betsProtocol";

async function updateBet(betId: number, updateData) {
  return prisma.bet.update({
    where: {
      id: betId,
    },
    data: updateData,
  });
}

async function create(betData: CreateBetParams) {
  const newBet = await prisma.bet.create({
    data: {
      homeTeamScore: betData.homeTeamScore,
      awayTeamScore: betData.awayTeamScore,
      amountBet: betData.amountBet,
      gameId: betData.gameId,
      participantId: betData.participantId,
      amountWon: null,
    },
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
  });

  return newBet;
}

async function findByGameId(gameId: number) {
  const allBets = await prisma.bet.findMany({
    where: {
      gameId: gameId,
    },
  });

  return allBets;
}

export default { create, findByGameId, updateBet };
