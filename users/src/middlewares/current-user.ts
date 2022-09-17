import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  phone: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// Set current user from JWT
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();
  try {
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as UserPayload;
  } catch (e) {
    next(e);
  }
  next();
};
