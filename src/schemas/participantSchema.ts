import Joi from "joi";

export const createParticipantSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
