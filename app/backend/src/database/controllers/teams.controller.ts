import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private service: TeamsService) {}

  public findAll = async (req: Request, res: Response): Promise<void> => {
    const allTeams = await this.service.findAll();
    res.status(200).json(allTeams);
  };
}
