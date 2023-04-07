import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import Matches from '../database/models/MatchesModel';
import authToken from '../middleware/verifyAuthToken';
import MatchesService from '../services/matches.service';

const matchesRouter = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.getMatches);
matchesRouter.patch('/:id/finish', authToken, matchesController.finishMatch);
matchesRouter.patch('/:id/', authToken, matchesController.updateMatchScore);
matchesRouter.post('/', authToken, matchesController.createMatch);

export default matchesRouter;
