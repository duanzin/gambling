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

async function increaseBalance(participantId: number, amountToAdd: number) {
  await prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      balance: {
        increment: amountToAdd,
      },
    },
  });
}

async function decreaseBalance(
  participantId: number,
  amountToSubtract: number
) {
  await prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      balance: {
        decrement: amountToSubtract,
      },
    },
  });
}

export default {
  create,
  findAll,
  findById,
  increaseBalance,
  decreaseBalance,
};
