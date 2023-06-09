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

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.service.updateMatchStatusById(id);
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchScore = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.updateMatchScoreById(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Score Updated' });
  };

  public createMatch = async (req: Request, res: Response): Promise<Response> => {
    const newMatchData = req.body;
    const postMatch = await this.service.postMatch(newMatchData);

    if (!postMatch) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(postMatch);
  };
}
