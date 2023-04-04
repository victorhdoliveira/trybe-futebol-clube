import { ModelStatic } from 'sequelize';
import { IUser } from '../interfaces/IUser';
import Users from '../models/UsersModel';

export default class LoginService {
  private _userModel: ModelStatic<Users>;
  constructor(model: ModelStatic<Users>) {
    this._userModel = model;
  }

  public async findByUserEmail(email: string): Promise<IUser | null> {
    return this._userModel.findOne({ where: { email } });
  }
}
