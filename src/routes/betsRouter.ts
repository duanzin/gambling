import { Router } from "express";
import { createBetSchema } from "../schemas/betSchema";
import { validateSchema } from "../middleware/validateSchema";

const betsRouter = Router();

betsRouter.post("/", validateSchema(createBetSchema));

export default betsRouter;
