import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { createParticipantSchema } from "../schemas/participantSchema";
import participantsController from "../controller/participantsController";

const participantsRouter = Router();

participantsRouter.post(
  "/",
  validateSchema(createParticipantSchema),
  participantsController.createParticipant
);
participantsRouter.get("/", participantsController.getParticipants);

export default participantsRouter;
