import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import Token from '../auth/jsw';
import LoginService from '../services/login.service';

export default class LoginController {
  private _token: Token;
  constructor(private _service: LoginService) {
    this._token = new Token();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user = await this._service.findByUserEmail(email);
      if (!user || !compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = this._token.createToken(user);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Error' });
    }
  };
}
