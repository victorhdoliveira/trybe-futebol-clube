import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamsModel';

export default class TeamsService {
  private teamModel: ModelStatic<Teams>;
  constructor(model: ModelStatic<Teams>) {
    this.teamModel = model;
  }

  public async findAll(): Promise<Teams[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}
