import { NextFunction, Request, Response } from "express";
import { validationError } from "errors";
import { Schema } from "joi";

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw validationError(error.details);
    } else {
      next();
    }
  };
}
