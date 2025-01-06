import { Router } from 'express';
import path from 'path';
import user from './controllers/UserController.js';

const routes = Router();

routes.get('/users', user.index);
routes.post('/users', user.store);

routes.get('/', (req, res) => {
  res.sendFile(path.resolve('src/templates/index.html'));
});

routes.get('/about', (req, res) => {
  res.sendFile(path.resolve('src/templates/about.html'));
});

routes.get('/contact', (req, res) => {
  res.sendFile(path.resolve('src/templates/contact.html'));
});

export default routes;
