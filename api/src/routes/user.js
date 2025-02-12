import express from 'express';
import UserController from "../controllers/user.js";

const router = express.Router();

router.get("/teste", UserController.getUser);

export default router;
