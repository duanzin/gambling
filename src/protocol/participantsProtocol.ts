import { Participant } from "@prisma/client";

export type CreateParticipantParams = Omit<
  Participant,
  "id" | "createdAt" | "updatedAt"
>;
