/**
 * @file Auth API
 * @description Documentação das rotas de autenticação da API.
 * @module Auth
 */

import express from "express";
import { register, login, refresh, logout } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/tokenValidation.js";
import { verifyRefreshToken } from "../middlewares/refreshTokenValidation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gerenciamento de autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login de um usuário
 *     description: Autentica o usuário e retorna tokens de acesso e refresh.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renova o token de acesso
 *     description: Gera um novo accessToken a partir do refreshToken.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *       403:
 *         description: Token inválido ou expirado
 */
router.post("/refresh", verifyRefreshToken, refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Faz logout do usuário
 *     description: Remove os cookies de autenticação.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.post("/logout", verifyToken, logout);

export default router;
