import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userContext?: UserPayload;
    }
  }
}

export const userContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    req.userContext = undefined;
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as UserPayload;
    req.userContext = decoded;
  } catch (err) {
    console.error("Failed to decode user context:", err);
  }

  next();
};
