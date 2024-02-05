import { Bet } from "@prisma/client";
import participantsRepository from "../repository/participantsRepository";
import {
  amountBetError,
  invalidGameError,
  notFoundError,
} from "../errors/index";
import gamesRepository from "../repository/gamesRepository";
import betsRepository from "../repository/betsRepository";
import participantsService from "./participantsService";
import { CreateBetParams } from "../protocol/betsProtocol";
import Reduce from "../utils/reduce";

async function postBet(betData: CreateBetParams): Promise<Bet> {
  const [participantExists, gameExists] = await Promise.all([
    participantsRepository.findById(betData.participantId),
    gamesRepository.findById(betData.gameId),
  ]);

  if (!participantExists || !gameExists) throw notFoundError();
  if (participantExists.balance < betData.amountBet) throw amountBetError();
  if (gameExists.isFinished === true) throw invalidGameError();

  return betsRepository.findParticipantAndGame(betData);
}

async function updateBet(homeScore: number, awayScore: number, gameId: number) {
  const allBets = await betsRepository.findByGameId(gameId);

  if (allBets.length === 0) {
    console.log("No bets to update.");
    return;
  }

  const winningBets = allBets.filter((bet) => {
    return bet.homeTeamScore === homeScore && bet.awayTeamScore === awayScore;
  });

  const sumWinningAmount = Reduce(winningBets.map((bet) => bet.amountBet));

  const totalAmountWagered = Reduce(allBets.map((bet) => bet.amountBet));

  const updatePromises = allBets.map((bet) => {
    const isWinningBet = winningBets.some(
      (winningBet) => winningBet.id === bet.id
    );

    const updateData = {
      status: isWinningBet ? "WON" : "LOST",
      amountWon: isWinningBet
        ? Math.floor(
            (bet.amountBet / sumWinningAmount) * totalAmountWagered * (1 - 0.3)
          )
        : 0,
    };

    return {
      betId: bet.id,
      updateData,
      participantId: bet.participantId,
      amountWon: updateData.amountWon,
    };
  });

  const updatedBets = await Promise.all(
    updatePromises.map(({ betId, updateData }) =>
      betsRepository.updateBet(betId, updateData)
    )
  );

  const winners = updatePromises
    .filter(({ updateData }) => updateData.status === "WON")
    .map(({ participantId, amountWon }) => ({ participantId, amountWon }));

  await participantsService.updateParticipantsBalances(winners);

  return updatedBets;
}

export default {
  postBet,
  updateBet,
};
