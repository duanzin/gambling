import Joi from "joi";
import { CreateGameParams, EndGameParams } from "protocol/gamesProtocol";

export const createGameSchema = Joi.object<CreateGameParams>({
  homeTeamName: Joi.string()
    .min(1)
    .regex(/^\S.*\S$/)
    .required(),
  awayTeamName: Joi.string()
    .min(1)
    .regex(/^\S.*\S$/)
    .required(),
});

export const endGameSchema = Joi.object<EndGameParams>({
  homeTeamScore: Joi.number().integer().min(0).required(),
  awayTeamScore: Joi.number().integer().min(0).required(),
});
