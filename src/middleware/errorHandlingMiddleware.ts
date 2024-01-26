import { NextFunction, Request, Response } from "express";

function sendErrorResponse(res: Response, status: number, message: string) {
  return res.status(status).json({ message });
}

export function handleApplicationErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "ValidationError") {
    return sendErrorResponse(res, 422, err.message);
  }

  if (err.name === "BadRequestError") {
    return sendErrorResponse(res, 400, err.message);
  }

  return sendErrorResponse(res, 500, err.message);
}
