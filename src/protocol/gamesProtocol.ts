export type CreateGameParams = {
  homeTeamName: string;
  awayTeamName: string;
};

export type EndGameParams = {
  homeTeamScore: number;
  awayTeamScore: number;
};
