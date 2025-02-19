import express from "express";
import { register, login, refresh, logout } from "../controllers/auth.js";
import { verifyRefreshToken } from "../middlewares/refreshTokenValidation.js";
import { verifyToken } from "../middlewares/tokenValidation.js";
import { body } from "express-validator";

const router = express.Router();

const validateRegister = [
  body("username").notEmpty().withMessage("O nome é obrigatório."),
  body("email").isEmail().withMessage("Email inválido."),
  body("password").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres."),
];

const validateLogin = [
  body("email").isEmail().withMessage("Email inválido."),
  body("password").notEmpty().withMessage("A senha é obrigatória."),
];

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", verifyToken, logout);
router.post("/refresh", verifyRefreshToken, refresh);

export default router;
