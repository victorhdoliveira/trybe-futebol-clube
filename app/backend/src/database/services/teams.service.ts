import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamsModel';

export default class TeamsService {
  private teamModel: ModelStatic<Teams>;
  constructor(model: ModelStatic<Teams>) {
    this.teamModel = model;
  }

  public async findAll(): Promise<Teams[]> {
    return this.teamModel.findAll();
  }

  public async findByTeamId(id: string): Promise<Teams | null> {
    return this.teamModel.findByPk(id);
  }
}
