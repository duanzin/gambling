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
