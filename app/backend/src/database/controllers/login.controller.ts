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
}

//   public authToken = async (req: Request, res: Response) => {
//     try {
//       const { authorization } = req.headers;

//       if (!authorization) {
//         return res.status(401).json({ message: 'Token not found' });
//       }
//       this._token.verifyToken(authorization);
//       return res.status(200).json({ role: 'admin' });
//     } catch (err) {
//       res.status(401).json({ message: 'Token must be a valid token' });
//     }
//   };
// }
