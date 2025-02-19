import express from 'express';
import {creatPost, getPost} from "../controllers/post.js";
import {verifyToken} from '../middlewares/TokenValidation.js';

const router = express.Router()

router.post("/", verifyToken,creatPost);
router.get("/", verifyToken,getPost);

export default router;
