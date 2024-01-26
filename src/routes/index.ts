import { Router } from "express";
import participantsRouter from "./participantsRouter";
import gamesRouter from "./gamesRouter";
import betsRouter from "./betsRouter";

const routes = Router();

routes
  .use("/participants", participantsRouter)
  .use("/games", gamesRouter)
  .use("/bets", betsRouter)

export default routes;