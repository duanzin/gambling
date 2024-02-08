import { NextFunction, Request, Response } from "express";

const errorStatusMapping: Record<string, number> = {
  ValidationError: 422,
  BadRequestError: 400,
  ConflictError: 409,
  NotFoundError: 404,
};

function sendErrorResponse(res: Response, status: number, message: string) {
  return res.status(status).json({ message });
}

export function handleApplicationErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = errorStatusMapping[err.name] || 500;
  return sendErrorResponse(res, status, err.message);
}
