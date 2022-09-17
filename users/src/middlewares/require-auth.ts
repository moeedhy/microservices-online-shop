import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/auth-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new AuthError("not authorized");
  next();
};
