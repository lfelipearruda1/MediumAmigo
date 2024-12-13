import { Router } from "express";
import IndexController from '../controllers/index';

const router = new Router();

router.get('/', IndexController.index);

export default router;
