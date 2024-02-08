import { Game } from "@prisma/client";
import gamesRepository from "../repository/gamesRepository";
import { conflictError, gameNotFoundError } from "../errors/index";

async function getAllGames(): Promise<Game[]> {
  return await gamesRepository.findAll();
}

async function getSpecificGame(id: number): Promise<Game> {
  const game = await gamesRepository.findById(id);
  if (!game) throw gameNotFoundError();
  return game;
}

async function postGame(
  homeTeamName: string,
  awayTeamName: string
): Promise<Game> {
  return await gamesRepository.create(homeTeamName, awayTeamName);
}

async function endGame(
  homeTeamScore: number,
  awayTeamScore: number,
  id: number
): Promise<Game> {
  const gameExists = await gamesRepository.findById(id);
  if (!gameExists) throw gameNotFoundError();
  if (gameExists.isFinished === true) throw conflictError();
  return await gamesRepository.transactionForEndGame(
    homeTeamScore,
    awayTeamScore,
    id
  );
}

export default {
  getAllGames,
  getSpecificGame,
  postGame,
  endGame,
};
