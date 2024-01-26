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

export default {
  create,
  findAll,
};
