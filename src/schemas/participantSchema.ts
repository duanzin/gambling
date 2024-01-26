import Joi from "joi";

export const createParticipantSchema = Joi.object({
  name: Joi.string().min(1).required(),
  balance: Joi.number().integer().min(1000).required(),
});
