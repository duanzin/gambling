import { CreateBetParams } from "../protocol/betsProtocol";
import { prisma } from "../config/database";

async function update(homeScore: number, awayScore: number, gameId: number) {
  const allBets = await prisma.bet.findMany({
    where: {
      gameId: gameId,
    },
  });

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

    return prisma.bet.update({
      where: {
        id: bet.id,
      },
      data: updateData,
    });
  });

  await Promise.all(updatePromises);
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

export default { update, create };
