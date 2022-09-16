import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomError)
    return res.status(err.statusCode).send(err.serialize());
  return res.status(500).send([{ message: err.message }]);
};
