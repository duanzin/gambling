import { NextFunction, Request, Response } from "express";
import betsService from "../services/betsService";

async function createBet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newBet = await betsService.postBet(
      req.body
    );
    res.status(201).send(newBet);
  } catch (error) {
    next(error);
  }
}

export default {
  createBet,
};
