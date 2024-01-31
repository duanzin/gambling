import { faker } from "@faker-js/faker";
import { createBetSchema } from "../../src/schemas/betSchema";

describe("createBetSchema", () => {
  const generateValidInput = () => ({
    homeTeamScore: faker.number.int(),
    awayTeamScore: faker.number.int(),
    amountBet: faker.number.int({ min: 1, max: 1000000 }),
    gameId: faker.number.int({ min: 1, max: 1000000000 }),
    participantId: faker.number.int({ min: 1, max: 1000000000 }),
  });

  describe("when homeTeamScore is not valid", () => {
    it("should return error if homeTeamScore is not present", () => {
      const input = generateValidInput();
      delete input.homeTeamScore;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamScore is not a number", () => {
      const input = generateValidInput();
      input.homeTeamScore = faker.string.alpha() as any;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when awayTeamScore is not valid", () => {
    it("should return error if awayTeamScore is not present", () => {
      const input = generateValidInput();
      delete input.awayTeamScore;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamScore is not a number", () => {
      const input = generateValidInput();
      input.awayTeamScore = faker.string.alpha() as any;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when amountBet is not valid", () => {
    it("should return error if amountBet is not present", () => {
      const input = generateValidInput();
      delete input.amountBet;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if amountBet is not a number", () => {
      const input = generateValidInput();
      input.amountBet = faker.string.alpha() as any;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if amountBet is less than 1", () => {
      const input = generateValidInput();
      input.amountBet = 0;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when gameId is not valid", () => {
    it("should return error if gameId is not present", () => {
      const input = generateValidInput();
      delete input.gameId;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if gameId is not a number", () => {
      const input = generateValidInput();
      input.gameId = faker.string.alpha() as any;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if gameId is less than 1", () => {
      const input = generateValidInput();
      input.gameId = 0;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when participantId is not valid", () => {
    it("should return error if participantId is not present", () => {
      const input = generateValidInput();
      delete input.participantId;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if participantId is not a number", () => {
      const input = generateValidInput();
      input.participantId = faker.string.alpha() as any;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if participantId is less than 1", () => {
      const input = generateValidInput();
      input.participantId = 0;

      const { error } = createBetSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = createBetSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
