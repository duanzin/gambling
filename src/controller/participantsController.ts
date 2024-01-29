import { NextFunction, Request, Response } from "express";
import participantsService from "../services/participantsService";
import { CreateParticipantParams } from "protocol/participantsProtocol";

async function getParticipants(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const participants = await participantsService.getAllParticipants();
    res.status(200).send(participants);
  } catch (error) {
    next(error);
  }
}

async function createParticipant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, balance }: CreateParticipantParams = req.body;
    const newParticipant = await participantsService.postParticipant(
      name,
      balance
    );
    res.status(201).send(newParticipant);
  } catch (error) {
    next(error);
  }
}

export default {
  getParticipants,
  createParticipant,
};
