import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { createParticipantSchema } from "../schemas/participantSchema";

const participantsRouter = Router();

participantsRouter.post("/", validateSchema(createParticipantSchema));
participantsRouter.get("/");

export default participantsRouter;
