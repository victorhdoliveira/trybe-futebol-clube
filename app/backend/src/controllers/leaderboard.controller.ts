import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private _service: LeaderboardService) {}

  public homeStandings = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this._service.getLeaderboardHomeOrAway('home');
    if (!leaderboard) {
      return res.status(500).json({ message: 'Error getting home leaderboard' });
    }
    return res.status(200).json(leaderboard);
  };

  public awayStandings = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this._service.getLeaderboardHomeOrAway('away');
    if (!leaderboard) {
      return res.status(500).json({ message: 'Error getting away leaderboard' });
    }
    return res.status(200).json(leaderboard);
  };

  public completeStandings = async (req: Request, res: Response): Promise<Response> => {
    const leaderboard = await this._service.getCompleteLeaderboard();
    if (!leaderboard) {
      return res.status(500).json({ message: 'Error getting leaderboard' });
    }
    return res.status(200).json(leaderboard);
  };
}
