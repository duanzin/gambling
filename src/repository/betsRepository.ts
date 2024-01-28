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

export default { update };
