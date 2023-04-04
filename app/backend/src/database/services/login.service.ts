import { compareSync } from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import { createToken } from '../auth/jsw';
import Users from '../models/UsersModel';

export default class LoginService {
  private _userModel: ModelStatic<Users>;
  constructor(model: ModelStatic<Users>) {
    this._userModel = model;
  }

  public async getLogin(email: string, password: string) {
    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    if (compareSync(password, user.password)) {
      const token = createToken(user);
      return token;
    }
  }
}
