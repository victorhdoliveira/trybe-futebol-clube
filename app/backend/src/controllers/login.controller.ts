import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private _service: LoginService) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this._service.getLogin(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body.user;
    if (!email) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const role = await this._service.getUserRole(email);
    return res.status(200).json(role);
  };
}
