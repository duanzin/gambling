import Joi from "joi";
import { CreateBetParams } from "../protocol/betsProtocol";

export const createBetSchema = Joi.object<CreateBetParams>({
  homeTeamScore: Joi.number().integer().min(0).max(100).required(),
  awayTeamScore: Joi.number().integer().min(0).max(100).required(),
  amountBet: Joi.number().integer().min(1).max(1000000).required(),
  gameId: Joi.number().integer().min(1).required(),
  participantId: Joi.number().integer().min(1).required(),
});
