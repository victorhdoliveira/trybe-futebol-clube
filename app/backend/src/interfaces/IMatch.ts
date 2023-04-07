export interface IMatchBody {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchBody {
  id: number;
  inProgress: string;
}
