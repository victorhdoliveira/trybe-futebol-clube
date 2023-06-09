import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Users from '../database/models/UsersModel';
import authToken from '../middleware/verifyAuthToken';
import loginValidation from '../middleware/verifyLogin';
import LoginService from '../services/login.service';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.get('/role', authToken, loginController.getRole);
loginRouter.post('/', loginValidation, loginController.login);

export default loginRouter;
