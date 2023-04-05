import { Router } from 'express';
import MatchesController from '../database/controllers/matches.controller';
import Matches from '../database/models/MatchesModel';
import MatchesService from '../database/services/matches.service';

const matchesRouter = Router();
const matchesService = new MatchesService(Matches);
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', matchesController.findAll);

export default matchesRouter;
