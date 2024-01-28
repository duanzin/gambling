import { Game } from "@prisma/client";
import gamesRepository from "../repository/gamesRepository";
import { conflictError } from "../errors/index";
import betsRepository from "repository/betsRepository";

async function getAllGames(): Promise<Game[]> {
  return await gamesRepository.findAll();
}

async function getSpecificGame(id: number): Promise<Game> {
  return await gamesRepository.findById(id);
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
  const { isFinished } = await gamesRepository.findById(id);
  if (isFinished === true) throw conflictError();
  await betsRepository.update(homeTeamScore, awayTeamScore, id);
  return await gamesRepository.finish(homeTeamScore, awayTeamScore, id);
}

export default {
  getAllGames,
  getSpecificGame,
  postGame,
  endGame,
};
