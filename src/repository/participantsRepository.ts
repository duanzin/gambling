import { prisma } from "../config/database";

async function create(name: string, balance: number) {
  const newParticipant = await prisma.participant.create({
    data: {
      name,
      balance,
    },
    select: {
      id: true,
      name: true,
      balance: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newParticipant;
}

async function findAll() {
  const participants = await prisma.participant.findMany();

  return participants;
}

async function findById(participantId: number) {
  const participant = await prisma.participant.findUnique({
    where: {
      id: participantId,
    },
  });

  return participant;
}

async function updateBalance(participantId: number, newBalance: number) {
  await prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      balance: newBalance,
    },
  });
}

export default {
  create,
  findAll,
  findById,
  updateBalance,
};
