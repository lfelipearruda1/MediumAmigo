import { Router } from "express";
import userController from '../controllers/user';

const router = new Router();

router.post('/', userController.store);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.get('/:id', userController.update);
router.get('/:id', userController.delete);

export default router;
