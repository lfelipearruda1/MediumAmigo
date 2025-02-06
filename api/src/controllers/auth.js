import connect from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Função de registro
export const register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username) return res.status(422).json({ msg: "O nome é obrigatório." });
  if (!email) return res.status(422).json({ msg: "O email é obrigatório." });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória." });
  if (password !== confirmPassword) return res.status(422).json({ msg: "As senhas não são iguais." });

  connect.query("SELECT email FROM users WHERE email = $1", [email], async (error, data) => {
    if (error) return res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
    if (data.rows.length > 0) return res.status(422).json({ msg: "Este email já está sendo utilizado." });

    const passwordHash = await bcrypt.hash(password, 8);

    connect.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, passwordHash], (error) => {
      if (error) return res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
      return res.status(201).json({ msg: "Cadastro concluído com sucesso!" });
    });
  });
};

// Função de login
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ msg: "O email é obrigatório." });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória." });

  connect.query("SELECT * FROM users WHERE email = $1", [email], async (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
    }

    if (data.rows.length === 0) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const user = data.rows[0];
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ msg: "Senha incorreta." });
    }

    try {
      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      const token = jwt.sign(
        { id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      delete user.password;

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          msg: "Usuário logado com sucesso!",
          user,
        });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde." });
    }
  });
};

export const logout = (req, res) => {
  return res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .clearCookie("refreshToken", { secure: true, sameSite: "none" })
    .status(200)
    .json({ msg: "Logout efetuado com sucesso" });
};

export const refresh = (req, res) => {
  try {
    const authHeader = req.headers.cookie;
    if (!authHeader) return res.status(401).json({ msg: "Nenhum cookie encontrado." });

    const refreshCookie = authHeader.split("; ").find(cookie => cookie.startsWith("refreshToken="));
    if (!refreshCookie) return res.status(401).json({ msg: "Token de atualização não encontrado." });

    const refreshToken = refreshCookie.split("=")[1];

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Token inválido ou expirado." });

      const newToken = jwt.sign(
        { id: decoded.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      return res
        .cookie("accessToken", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ msg: "Token renovado com sucesso!" });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro ao processar a requisição." });
  }
};
