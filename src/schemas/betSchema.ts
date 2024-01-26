import Joi from "joi";

export const createBetSchema = Joi.object({
  homeTeamScore: Joi.number().integer().min(0).required(),
  awayTeamScore: Joi.number().integer().min(0).required(),
  amountBet: Joi.number().integer().min(0).required(),
  gameId: Joi.number().integer().min(1).required(),
  participantId: Joi.number().integer().min(1).required(),
});
