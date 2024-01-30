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

async function updateParticipantsBalances(winners) {
  const participantBalances: { [key: number]: number } = {};

  winners.forEach(({ participantId, amountWon }) => {
    const id: number = participantId as number;
    if (!participantBalances[id]) {
      participantBalances[id] = 0;
    }
    participantBalances[id] += amountWon;
  });

  const updateParticipantBalancesPromises = Object.entries(
    participantBalances
  ).map(([participantId, amountWon]) =>
    participantsRepository.updateBalance(parseInt(participantId, 10), amountWon)
  );

  await Promise.all(updateParticipantBalancesPromises);
}

export default {
  getAllParticipants,
  postParticipant,
  updateParticipantsBalances,
};
