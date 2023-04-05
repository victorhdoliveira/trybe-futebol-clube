import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/jsw';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = verifyToken(authorization);
    req.body = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authToken;
