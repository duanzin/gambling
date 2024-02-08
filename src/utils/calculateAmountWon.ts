export function calculateAmountWon(
  amountBet: number,
  sumWinningAmount: number,
  totalAmountWagered: number
): number {
  return Math.floor(
    (amountBet / sumWinningAmount) * totalAmountWagered * (1 - 0.3)
  );
}
