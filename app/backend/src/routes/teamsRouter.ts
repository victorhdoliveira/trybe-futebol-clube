import { Router } from 'express';
import TeamsController from '../database/controllers/teams.controller';
import Teams from '../database/models/TeamsModel';
import TeamsService from '../database/services/teams.service';

const teamRouter = Router();
const teamService = new TeamsService(Teams);
const teamController = new TeamsController(teamService);

teamRouter.get('/', teamController.findAll);
teamRouter.get('/:id', teamController.findById);

export default teamRouter;
