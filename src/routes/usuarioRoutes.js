import { Router } from "express";
import usuarioController from '../controllers/UsuarioController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', usuarioController.index);
router.post('/', loginRequired, usuarioController.store);
router.put('/:id', loginRequired, usuarioController.update);
router.get('/:id', usuarioController.show);
router.delete('/:id', loginRequired, usuarioController.delete);

export default router;
