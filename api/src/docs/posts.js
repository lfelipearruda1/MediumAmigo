/**
 * @file Post API
 * @description Documentação das rotas de posts na API.
 * @module Post
 */

import express from "express";
import { creatPost, getPost } from "../controllers/post.js";
import { verifyToken } from "../middlewares/TokenValidation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts dos usuários
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     description: Permite que um usuário autenticado crie um post.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_desc:
 *                 type: string
 *                 description: Descrição do post
 *               img:
 *                 type: string
 *                 description: URL da imagem do post (opcional)
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/", verifyToken, creatPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtém todos os posts
 *     description: Retorna todos os posts ordenados por data de criação.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", verifyToken, getPost);

export default router;
