import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import Teams from '../database/models/TeamsModel';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService(Teams);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', leaderboardController.homeStandings);
leaderboardRouter.get('/away', leaderboardController.awayStandings);
leaderboardRouter.get('/', leaderboardController.completeStandings);

export default leaderboardRouter;
