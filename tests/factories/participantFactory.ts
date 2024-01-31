import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";

export async function createParticipant() {
  await prisma.participant.create({
    data: {
      name: faker.string.alpha({ length: { min: 1, max: 50 } }),
      balance: faker.number.int({ min: 1000, max: 1000000 }),
    },
  });
}
