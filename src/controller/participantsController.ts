import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../errors/index";

async function getParticipants(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

async function createParticipant(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export default {
  getParticipants,
  createParticipant
}