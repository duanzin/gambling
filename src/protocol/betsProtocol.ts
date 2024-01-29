import { Bet } from "@prisma/client";

export type CreateBetParams = Omit<
  Bet,
  "id" | "status" | "createdAt" | "updatedAt" | "amountWon"
>;
