import { prisma } from "../config/database";
import { Bet } from "@prisma/client";
import participantsRepository from "../repository/participantsRepository";
import {
  amountBetError,
  invalidGameError,
  notFoundError,
} from "../errors/index";
import gamesRepository from "../repository/gamesRepository";
import betsRepository from "../repository/betsRepository";
import { CreateBetParams } from "../protocol/betsProtocol";

async function postBet(betData: CreateBetParams): Promise<Bet> {
  const [participantExists, gameExists] = await Promise.all([
    participantsRepository.findById(betData.participantId),
    gamesRepository.findById(betData.gameId),
  ]);

  if (!participantExists || !gameExists) throw notFoundError();
  if (participantExists.balance < betData.amountBet) throw amountBetError();
  if (gameExists.isFinished === true) throw invalidGameError();

  return await prisma.$transaction(async () => {
    const newBalance: number = participantExists.balance - betData.amountBet;
    await participantsRepository.updateBalance(
      betData.participantId,
      newBalance
    );
    const newBet = await betsRepository.create(betData);
    return newBet;
  });
}

export default {
  postBet,
};
