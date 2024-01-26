import { Router } from "express";

const gamesRouter = Router();

gamesRouter.post("/:id/finish");
gamesRouter.post("/");
gamesRouter.get("/:id");
gamesRouter.get("/");

export default gamesRouter;