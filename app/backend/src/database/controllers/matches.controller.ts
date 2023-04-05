import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service: MatchesService) {}

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    const allMatches = await this.service.findAll();
    return res.status(200).json(allMatches);
  };
}
