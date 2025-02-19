import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokens = (userId) => {
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  const accessToken = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

  return { accessToken, refreshToken };
};

export const registerUser = async ({ username, email, password, confirmPassword }) => {
  try {
    if (!username || !email || !password) return { status: 422, msg: "Todos os campos são obrigatórios." };
    if (password !== confirmPassword) return { status: 422, msg: "As senhas não coincidem." };

    const existingUser = await db.query("SELECT email FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) return { status: 422, msg: "Este email já está sendo utilizado." };

    const passwordHash = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, passwordHash]);

    return { status: 201, msg: "Cadastro concluído com sucesso!" };
  } catch (error) {
    console.error("Erro no registro:", error);
    return { status: 500, msg: "Erro no servidor. Tente novamente mais tarde." };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    if (!email || !password) return { status: 422, msg: "O email e senha são obrigatórios." };

    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (rows.length === 0) return { status: 404, msg: "Usuário não encontrado." };

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { status: 401, msg: "Senha incorreta." };

    const { accessToken, refreshToken } = generateTokens(user.id);
    delete user.password;

    return { status: 200, msg: "Usuário logado com sucesso!", user, accessToken, refreshToken };
  } catch (error) {
    console.error("Erro no login:", error);
    return { status: 500, msg: "Erro no servidor. Tente novamente mais tarde." };
  }
};

export const refreshTokenService = async (cookies) => {
  try {
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) return { status: 401, msg: "Token de atualização não encontrado." };

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id);

    return { status: 200, msg: "Token renovado com sucesso!", accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error("Erro no refresh token:", error);
    return { status: 403, msg: "Token inválido ou expirado." };
  }
};

export const logoutUser = (res) => {
  return res
    .clearCookie("accessToken", { secure: true, sameSite: "strict" })
    .clearCookie("refreshToken", { secure: true, sameSite: "strict" })
    .status(200)
    .json({ msg: "Logout efetuado com sucesso." });
};
