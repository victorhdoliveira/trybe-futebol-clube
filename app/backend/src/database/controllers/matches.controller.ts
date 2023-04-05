import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service: MatchesService) {}

  public getMatches = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    const allMatches = await this.service.findAll();

    if (inProgress === 'true') {
      const notFinished = allMatches.filter((match) => match.inProgress);
      return res.status(200).json(notFinished);
    } if (inProgress === 'false') {
      const finished = allMatches.filter((match) => !match.inProgress);
      return res.status(200).json(finished);
    }
    return res.status(200).json(allMatches);
  };
}
