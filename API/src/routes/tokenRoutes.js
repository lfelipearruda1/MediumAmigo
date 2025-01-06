import { Router } from "express";
import TokenController from '../controllers/TokenContoller';

const router = new Router();

router.post('/', TokenController.store);

export default router;
