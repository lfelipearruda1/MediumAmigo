import { Router } from 'express';
import user from './controllers/UserController.js';

const routes = Router();

routes.get('/users', user.index);
routes.post('/users', user.store);

export default routes;
