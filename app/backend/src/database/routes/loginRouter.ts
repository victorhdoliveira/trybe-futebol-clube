import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middleware/verifyLogin';
import Users from '../models/UsersModel';
import LoginService from '../services/login.service';

const loginRouter = Router();
const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

loginRouter.post('/', loginValidation, loginController.login);
// loginRouter.get('/role', loginController.authToken);

export default loginRouter;
