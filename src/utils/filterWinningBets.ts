export function FilterWinningBets(
  allBets: any[],
  homeScore: number,
  awayScore: number
): any[] {
  return allBets.filter(
    (bet) => bet.homeTeamScore === homeScore && bet.awayTeamScore === awayScore
  );
}
