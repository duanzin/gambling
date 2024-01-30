import { Router } from "express";
import { createBetSchema } from "../schemas/betSchema";
import { validateSchema } from "../middleware/validateSchema";
import betsController from "controller/betsController";

const betsRouter = Router();

betsRouter.post("/", validateSchema(createBetSchema), betsController.createBet);

export default betsRouter;
