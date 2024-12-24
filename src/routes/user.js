import { Router } from 'express';
import userController from '../controllers/user';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store);
router.get('/', loginRequired ,userController.index);
router.get('/:id', userController.show);
router.get('/:id', userController.update);
router.get('/:id', userController.delete);

export default router;
