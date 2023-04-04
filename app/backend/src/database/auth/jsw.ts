import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/IUser';

dotenv.config();

export default class Token {
  private _jwt = jwt;
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'jwtsecret';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '7d',
    };
  }

  createToken(payload:IPayload): string {
    const { id, username, email, role } = payload;
    const token = this._jwt.sign({ id, username, email, role }, this._secret, this._options);
    return token;
  }
}
