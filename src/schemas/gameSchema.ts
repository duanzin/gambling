import Joi from "joi";

export const createGameSchema = Joi.object({
  name: Joi.string().min(1).required(),
  balance: Joi.number().integer().min(0).required(),
});
