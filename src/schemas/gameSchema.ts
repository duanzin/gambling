import Joi from "joi";

export const createGameSchema = Joi.object({
  homeTeamName: Joi.string().min(1).required(),
  awayTeamName: Joi.string().min(1).required(),
});

export const endGameSchema = Joi.object({
  homeTeamScore: Joi.number().integer().min(0).required(),
  awayTeamScore: Joi.number().integer().min(0).required(),
});
