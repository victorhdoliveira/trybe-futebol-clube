import { ModelStatic } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import { allGamesFuncs, homeOrAwayFuncs } from '../utils/calulationLeaderboard';

export default class LeaderboardService {
  teamModel: ModelStatic<Teams>;

  constructor(
    teamModel: ModelStatic<Teams>,
  ) {
    this.teamModel = teamModel;
  }

  public async getLeaderboardHomeOrAway(gameLocation:string) {
    const teams = await this.teamModel.findAll();

    const createLeaderboard = teams.map(async (team) => {
      const leaderboardData = {
        name: team.teamName,
        totalPoints: await homeOrAwayFuncs.pointsGameLocation(Number(team.id), gameLocation),
        totalGames: await homeOrAwayFuncs.gamesbyLocation(Number(team.id), gameLocation),
        totalVictories: await homeOrAwayFuncs.victoriesByLocation(Number(team.id), gameLocation),
        totalDraws: await homeOrAwayFuncs.drawsByLocation(Number(team.id), gameLocation),
        totalLosses: await homeOrAwayFuncs.lossesByLocation(Number(team.id), gameLocation),
        goalsFavor: await homeOrAwayFuncs.goalsFavorByLocation(Number(team.id), gameLocation),
        goalsOwn: await homeOrAwayFuncs.goalsOwnByLocation(Number(team.id), gameLocation),
        goalsBalance: await homeOrAwayFuncs.goalsBalanceByLocation(Number(team.id), gameLocation),
        efficiency: await homeOrAwayFuncs.efficiencyByLocation(Number(team.id), gameLocation),
      };
      return leaderboardData;
    });
    return Promise.all(createLeaderboard);
  }

  public async getCompleteLeaderboard() {
    const teams = await this.teamModel.findAll();

    const createLeaderboard = teams.map(async (team) => {
      const leaderboardData = {
        name: team.teamName,
        totalPoints: await allGamesFuncs.totalPoints(Number(team.id)),
        totalGames: await allGamesFuncs.totalGames(Number(team.id)),
        totalVictories: await allGamesFuncs.victories(Number(team.id)),
        totalDraws: await allGamesFuncs.draws(Number(team.id)),
        totalLosses: await allGamesFuncs.losses(Number(team.id)),
        goalsFavor: await allGamesFuncs.goalsFavor(Number(team.id)),
        goalsOwn: await allGamesFuncs.goalsOwn(Number(team.id)),
        goaslBalance: await allGamesFuncs.goalsBalance(Number(team.id)),
        efficiency: await allGamesFuncs.efficiency(Number(team.id)),
      };
      return leaderboardData;
    });
    const leaderboard = Promise.all(createLeaderboard);
    return leaderboard;
  }
}
