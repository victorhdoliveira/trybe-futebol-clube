import { Router } from 'express';
import MatchesController from '../database/controllers/matches.controller';
import authToken from '../database/middleware/verifyAuthToken';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../database/services/matches.service';

const matchesRouter = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.patch('/:id/finish', authToken, matchesController.finishMatch);
matchesRouter.patch('/:id/', authToken, matchesController.updateMatchScore);
matchesRouter.get('/', matchesController.getMatches);

export default matchesRouter;
