import { faker } from "@faker-js/faker";
import { createParticipantSchema } from "../../src/schemas/participantSchema";

describe("createParticipantSchema", () => {
  const generateValidInput = () => ({
    name: faker.string.alpha(),
    balance: faker.number.int({ min: 1000 }),
  });

  describe("when name is not valid", () => {
    it("should return error if name is not present", () => {
      const input = generateValidInput();
      delete input.name;

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is not a string", () => {
      const input = generateValidInput();
      input.name = faker.number.int() as any;

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is empty", () => {
      const input = generateValidInput();
      input.name = "";

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is all blank spaces", () => {
      const input = generateValidInput();
      input.name = "     ";

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name starts with a blank space", () => {
      const input = generateValidInput();
      input.name = " " + faker.string.alpha();

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name ends with a blank space", () => {
      const input = generateValidInput();
      input.name = faker.string.alpha() + " ";

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when balance is not valid", () => {
    it("should return error if balance is not present", () => {
      const input = generateValidInput();
      delete input.balance;

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if balance is not a number", () => {
      const input = generateValidInput();
      input.balance = faker.string.alpha() as any;

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if balance is less than 1000", () => {
      const input = generateValidInput();
      input.balance = faker.number.int({ max: 999 });

      const { error } = createParticipantSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = createParticipantSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
