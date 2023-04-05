import { Router } from 'express';
import LoginController from '../database/controllers/login.controller';
import authToken from '../database/middleware/verifyAuthToken';
import loginValidation from '../database/middleware/verifyLogin';
import Users from '../database/models/UsersModel';
import LoginService from '../database/services/login.service';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.get('/role', authToken, loginController.getRole);
loginRouter.post('/', loginValidation, loginController.login);

export default loginRouter;
