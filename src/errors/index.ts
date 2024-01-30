export function validationError(message: any) {
  return {
    name: "ValidationError",
    message,
  };
}

export function badRequestError() {
  return {
    name: "BadRequestError",
    message: "Bad Request",
  };
}

export function conflictError() {
  return {
    name: "ConflictError",
    message: "Game has already been finished",
  };
}

export function notFoundError() {
  return {
    name: "NotFoundError",
    message: "Element with the specified ID does not exist",
  };
}

export function amountBetError() {
  return {
    name: "AmountBetError",
    message: "Amount bet is greater than the participant's balance",
  };
}

export function invalidGameError() {
  return {
    name: "InvalidGameError",
    message: "The game you're trying to bet in is finished",
  };
}
