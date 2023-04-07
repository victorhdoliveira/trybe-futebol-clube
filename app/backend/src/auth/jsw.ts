import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/IUser';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwtsecret';
const options: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export const createToken = (payload:IPayload): string => {
  const { id, username, email, role } = payload;
  const token = jwt.sign({ id, username, email, role }, secret, options);
  return token;
};

export const verifyToken = (token:string) => jwt.verify(token, secret);
