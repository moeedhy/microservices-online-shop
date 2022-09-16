import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidatorError } from "../errors/request-validator-error";

export const validationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidatorError(errors.array());
  next();
};
