import Joi from "joi";
import { CreateParticipantParams } from "../protocol/participantsProtocol";

export const createParticipantSchema = Joi.object<CreateParticipantParams>({
  name: Joi.string()
    .min(1)
    .regex(/^\S(?:.*\S)?$/)
    .required(),
  balance: Joi.number().integer().min(1000).required(),
});
