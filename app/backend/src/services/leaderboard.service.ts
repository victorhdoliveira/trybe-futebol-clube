import { ModelStatic } from 'sequelize';
// import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import leaderboardFuncs from '../utils/calulationLeaderboard';

export default class LeaderboardService {
  // matchModel: ModelStatic<Matches>;
  teamModel: ModelStatic<Teams>;

  constructor(
    // matchModel: ModelStatic<Matches>,
    teamModel: ModelStatic<Teams>,
  ) {
    // this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  public async getLeaderboardHomeOrAway(gameLocation:string) {
    // const matches = await this.matchModel.findAll();
    const teams = await this.teamModel.findAll();

    const leaderboard = teams.map(async (team) => {
      const leaderboardData = {
        name: team.teamName,
        totalPoints: await leaderboardFuncs
          .getTotalPointsGameLocation(Number(team.id), gameLocation),
        totalGames: await leaderboardFuncs.getTotalGames(Number(team.id), gameLocation),
        totalVictories: await leaderboardFuncs.getTotalVictories(Number(team.id), gameLocation),
        totalDraws: await leaderboardFuncs.getTotalDraws(Number(team.id), gameLocation),
        totalLosses: await leaderboardFuncs.getTotalLosses(Number(team.id), gameLocation),
        goalsFavor: await leaderboardFuncs.getTotalGoalsFavor(Number(team.id), gameLocation),
        goalsOwn: await leaderboardFuncs.getTotalGoalsFavor(Number(team.id), gameLocation),
      };
      return leaderboardData;
    });
    return Promise.all(leaderboard);
  }
}
