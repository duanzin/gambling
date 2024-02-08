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

export function amountBetError() {
  return {
    name: "BadRequestError",
    message: "Amount bet is greater than the participant's balance",
  };
}

export function invalidGameError() {
  return {
    name: "BadRequestError",
    message: "The game you're trying to bet in is finished",
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
    message: "Element does not exist",
  };
}

export function gameNotFoundError() {
  return {
    name: "NotFoundError",
    message: "Game with the specified ID does not exist",
  };
}

export function participantNotFoundError() {
  return {
    name: "NotFoundError",
    message: "Participant with the specified ID does not exist",
  };
}
