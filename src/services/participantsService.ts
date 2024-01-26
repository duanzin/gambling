import { Participant } from "@prisma/client";
import participantsRepository from "../repository/participantsRepository";

async function getAllParticipants(): Promise<Participant[]> {
  return await participantsRepository.findAll();
}

async function postParticipant(
  name: string,
  balance: number
): Promise<Participant> {
  return await participantsRepository.create(name, balance);
}

export default {
  getAllParticipants,
  postParticipant
};
