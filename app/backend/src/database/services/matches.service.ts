import { ModelStatic } from 'sequelize';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

export default class MatchesService {
  private _matchModel: ModelStatic<Matches>;
  constructor(model: ModelStatic<Matches>) {
    this._matchModel = model;
  }

  public async findAll(): Promise<Matches[]> {
    return this._matchModel.findAll({
      include: [
        {
          model: Teams,
          attributes: ['teamName'],
          as: 'homeTeam',
        },
        {
          model: Teams,
          attributes: ['teamName'],
          as: 'awayTeam',
        },
      ],
    });
  }

  public async updateMatchById(id: string) {
    return this._matchModel.update(
      { inProgress: 'false' },
      { where: { id } },
    );
  }
}
