import { Router } from 'express';
import userController from '../controllers/user';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

//router.get('/', userController.index);
//router.get('/:id', userController.show);

router.post('/', userController.store);
router.get('/', loginRequired ,userController.update);
router.get('/', loginRequired ,userController.delete);

export default router;
