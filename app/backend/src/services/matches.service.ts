import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { IMatchBody } from '../interfaces/IMatch';

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

  public async updateMatchStatusById(id: string) {
    return this._matchModel.update(
      { inProgress: 'false' },
      { where: { id } },
    );
  }

  public async updateMatchScoreById(id: string, homeTeamGoals: number, awayTeamGoals:number) {
    return this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async postMatch(newMatch: IMatchBody) {
    const allMatches = await this._matchModel.findAll();
    const home = allMatches.find((match) => match.homeTeamId === newMatch.homeTeamId);
    const away = allMatches.find((match) => match.awayTeamId === newMatch.awayTeamId);

    if (!home || !away) {
      return null;
    }
    return this._matchModel.create({ ...newMatch, inProgress: true });
  }
}
