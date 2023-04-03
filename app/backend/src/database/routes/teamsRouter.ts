import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import Teams from '../models/TeamsModel';
import TeamsService from '../services/teams.service';

const teamRouter = Router();
const teamService = new TeamsService(Teams);
const teamController = new TeamsController(teamService);

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
