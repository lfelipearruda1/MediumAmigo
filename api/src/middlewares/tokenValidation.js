import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({ msg: "Acesso Negado. Nenhum cookie encontrado." });
    }

    const tokenCookie = cookies.split("; ").find((cookie) => cookie.startsWith("accessToken="));

    if (!tokenCookie) {
      return res.status(401).json({ msg: "Token de acesso não encontrado." });
    }

    const token = tokenCookie.split("=")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: "Token inválido ou expirado." });
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error("Erro na validação do token:", error);
    return res.status(500).json({ msg: "Erro interno no servidor ao validar token." });
  }
};
