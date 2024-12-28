import { Router } from 'express';
import user from './controllers/user.js'; // Atualize para a sintaxe de importação

const routes = Router();

routes.get('/users', user.index);
routes.post('/users', user.store);

export default routes;  // Exportando com 'export default'
