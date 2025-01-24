import connect from '../../connect.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username) return res.status(422).json({ msg: "O nome é obrigatório." });
  if (!email) return res.status(422).json({ msg: "O email é obrigatório." });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória." });
  if (password !== confirmPassword) return res.status(422).json({ msg: "As senhas não são iguais." });

  db.query("SELECT email FROM users WHERE email = $1", [email], async (error, data) => {
    if (error) return res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
    if (data.rows.length > 0) return res.status(422).json({ msg: "Este email já está sendo utilizado." });

    const passwordHash = await bcrypt.hash(password, 8);

    db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, passwordHash], (error) => {
      if (error) return res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde." });
      return res.status(201).json({ msg: "Cadastro concluído com sucesso!" });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ msg: "O email é obrigatório." });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória." });

  db.query("SELECT * FROM users WHERE email = $1", [email], async (error, data) => {
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
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        msg: "Login realizado com sucesso!",
        data: {
          user: { id: user.id, username: user.username, email: user.email },
          token: {
            token,
            refreshToken,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro ao gerar o token, tente novamente." });
    }
  });
};
