import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService(Matches, Teams);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', leaderboardController.homeStandings);
leaderboardRouter.get('/away', leaderboardController.awayStandings);

export default leaderboardRouter;
