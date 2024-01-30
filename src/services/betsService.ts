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

async function postBet(betData: CreateBetParams): Promise<Bet> {
  const [participantExists, gameExists] = await Promise.all([
    participantsRepository.findById(betData.participantId),
    gamesRepository.findById(betData.gameId),
  ]);

  if (!participantExists || !gameExists) throw notFoundError();
  if (participantExists.balance < betData.amountBet) throw amountBetError();
  if (gameExists.isFinished === true) throw invalidGameError();

  const newBalance: number = participantExists.balance - betData.amountBet;
  return betsRepository.findParticipantAndGame(newBalance, betData);
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

  const sumWinningAmount = winningBets.reduce(
    (sum, bet) => sum + bet.amountBet,
    0
  );

  const totalAmountWagered = allBets.reduce(
    (sum, bet) => sum + bet.amountBet,
    0
  );

  const houseFee = Math.floor((totalAmountWagered * 0.3) / 100);

  const updatePromises = allBets.map((bet) => {
    const isWinningBet = winningBets.some(
      (winningBet) => winningBet.id === bet.id
    );

    const updateData = {
      status: isWinningBet ? "WON" : "LOST",
      amountWon: isWinningBet
        ? Math.floor(
            (bet.amountBet / sumWinningAmount) * (totalAmountWagered - houseFee)
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
