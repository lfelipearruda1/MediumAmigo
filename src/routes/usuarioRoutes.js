import { Router } from "express";
import usuarioController from '../controllers/usuarioController';

const router = new Router();

router.get('/', usuarioController.index);

export default router;
