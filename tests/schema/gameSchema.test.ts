import { faker } from "@faker-js/faker";
import { createGameSchema, endGameSchema } from "../../src/schemas/gameSchema";

describe("createGameSchema", () => {
  const generateValidInput = () => ({
    homeTeamName: faker.string.alpha(),
    awayTeamName: faker.string.alpha(),
  });

  describe("when homeTeamName is not valid", () => {
    it("should return error if homeTeamName is not present", () => {
      const input = generateValidInput();
      delete input.homeTeamName;

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamName is not a string", () => {
      const input = generateValidInput();
      input.homeTeamName = faker.number.int() as any;

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamName is empty", () => {
      const input = generateValidInput();
      input.homeTeamName = "";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamName is all blank spaces", () => {
      const input = generateValidInput();
      input.homeTeamName = "     ";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamName starts with a blank space", () => {
      const input = generateValidInput();
      input.homeTeamName = " " + faker.string.alpha();

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamName ends with a blank space", () => {
      const input = generateValidInput();
      input.homeTeamName = faker.string.alpha() + " ";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when awayTeamName is not valid", () => {
    it("should return error if awayTeamName is not present", () => {
      const input = generateValidInput();
      delete input.awayTeamName;

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamName is not a string", () => {
      const input = generateValidInput();
      input.awayTeamName = faker.number.int() as any;

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamName is empty", () => {
      const input = generateValidInput();
      input.awayTeamName = "";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamName is all blank spaces", () => {
      const input = generateValidInput();
      input.awayTeamName = "     ";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamName starts with a blank space", () => {
      const input = generateValidInput();
      input.awayTeamName = " " + faker.string.alpha();

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamName ends with a blank space", () => {
      const input = generateValidInput();
      input.awayTeamName = faker.string.alpha() + " ";

      const { error } = createGameSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = createGameSchema.validate(input);

    expect(error).toBeUndefined();
  });
});

describe("endBetSchema", () => {
  const generateValidInput = () => ({
    homeTeamScore: faker.number.int(),
    awayTeamScore: faker.number.int(),
  });

  describe("when homeTeamScore is not valid", () => {
    it("should return error if homeTeamScore is not present", () => {
      const input = generateValidInput();
      delete input.homeTeamScore;

      const { error } = endGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if homeTeamScore is not a number", () => {
      const input = generateValidInput();
      input.homeTeamScore = faker.string.alpha() as any;

      const { error } = endGameSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when awayTeamScore is not valid", () => {
    it("should return error if awayTeamScore is not present", () => {
      const input = generateValidInput();
      delete input.awayTeamScore;

      const { error } = endGameSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if awayTeamScore is not a number", () => {
      const input = generateValidInput();
      input.awayTeamScore = faker.string.alpha() as any;

      const { error } = endGameSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = endGameSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
