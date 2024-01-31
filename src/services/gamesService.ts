import { Game } from "@prisma/client";
import gamesRepository from "../repository/gamesRepository";
import { conflictError, notFoundError } from "../errors/index";
import betsService from "./betsService";

async function getAllGames(): Promise<Game[]> {
  return await gamesRepository.findAll();
}

async function getSpecificGame(id: number): Promise<Game> {
  const game = await gamesRepository.findById(id);
  if (!game) throw notFoundError();
  console.log(game.Bet[0].createdAt);
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
  if (!gameExists) throw notFoundError();
  if (gameExists.isFinished === true) throw conflictError();
  await betsService.updateBet(homeTeamScore, awayTeamScore, id);
  return await gamesRepository.finish(homeTeamScore, awayTeamScore, id);
}

export default {
  getAllGames,
  getSpecificGame,
  postGame,
  endGame,
};
