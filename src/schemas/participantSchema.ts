import Joi from "joi";
import { CreateParticipantParams } from "../protocol/participantsProtocol";

export const createParticipantSchema = Joi.object<CreateParticipantParams>({
  name: Joi.string()
    .min(1)
    .max(50)
    .regex(/^\S(?:.*\S)?$/)
    .required(),
  balance: Joi.number().integer().min(1000).max(1000000).required(),
});
