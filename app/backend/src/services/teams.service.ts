import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  private _teamModel: ModelStatic<Teams>;
  constructor(model: ModelStatic<Teams>) {
    this._teamModel = model;
  }

  public async findAll(): Promise<Teams[]> {
    return this._teamModel.findAll();
  }

  public async findByTeamId(id: string): Promise<Teams | null> {
    return this._teamModel.findByPk(id);
  }
}
