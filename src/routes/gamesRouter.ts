import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { createGameSchema } from "../schemas/gameSchema";

const gamesRouter = Router();

gamesRouter.post("/:id/finish", validateSchema(createGameSchema));
gamesRouter.post("/", validateSchema(createGameSchema));
gamesRouter.get("/:id");
gamesRouter.get("/");

export default gamesRouter;
