import { NextFunction, Request, Response } from "express";
import betsService from "../services/betsService";
import { CreateBetParams } from "../protocol/betsProtocol";

async function createBet(req: Request, res: Response, next: NextFunction) {
  try {
    const betData: CreateBetParams = req.body;
    const newBet = await betsService.postBet(betData);
    res.status(201).send(newBet);
  } catch (error) {
    next(error);
  }
}

export default {
  createBet,
};
