import express from 'express';
import {creatComment, getComment} from "../controllers/comment.js";
import {verifyToken} from '../middlewares/TokenValidation.js';

const router = express.Router()

router.post("/", verifyToken, creatComment);
router.get("/", verifyToken, getComment);

export default router;
