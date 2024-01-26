import Joi from "joi";

export const createGameSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
