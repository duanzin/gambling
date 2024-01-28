import { NextFunction, Request, Response } from "express";
import gamesService from "../services/gamesService";
import { badRequestError } from "errors";

async function getGames(req: Request, res: Response, next: NextFunction) {
  try {
    const games = await gamesService.getAllGames();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
}

async function getGameById(req: Request, res: Response, next: NextFunction) {
  try {
    if (isNaN(parseInt(req.params.id))) throw badRequestError();
    const id: number = parseInt(req.params.id);
    const game = await gamesService.getSpecificGame(id);
    res.status(200).send(game);
  } catch (error) {
    next(error);
  }
}

async function createGame(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      homeTeamName,
      awayTeamName,
    }: { homeTeamName: string; awayTeamName: string } = req.body;
    const newGame = await gamesService.postGame(homeTeamName, awayTeamName);
    res.status(201).send(newGame);
  } catch (error) {
    next(error);
  }
}

async function finishGame(req: Request, res: Response, next: NextFunction) {
  try {
    if (isNaN(parseInt(req.params.id))) throw badRequestError();
    const id: number = parseInt(req.params.id);
    const {
      homeTeamScore,
      awayTeamScore,
    }: { homeTeamScore: number; awayTeamScore: number } = req.body;
    const finishedGame = await gamesService.endGame(
      homeTeamScore,
      awayTeamScore,
      id
    );
    res.status(200).send(finishedGame);
  } catch (error) {
    next(error);
  }
}

export default {
  getGames,
  getGameById,
  createGame,
  finishGame,
};
