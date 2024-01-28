import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema";
import { createGameSchema, endGameSchema } from "../schemas/gameSchema";
import gamesController from "../controller/gamesController";

const gamesRouter = Router();

gamesRouter.post(
  "/:id/finish",
  validateSchema(endGameSchema),
  gamesController.finishGame
);
gamesRouter.post(
  "/",
  validateSchema(createGameSchema),
  gamesController.createGame
);
gamesRouter.get("/:id", gamesController.getGameById);
gamesRouter.get("/", gamesController.getGames);

export default gamesRouter;
