import jwt from "jsonwebtoken";

export const checkRefreshToken = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({ msg: "Acesso Negado. Nenhum cookie encontrado." });
    }

    const refreshCookie = cookies.split("; ").find((cookie) => cookie.startsWith("refreshToken="));

    if (!refreshCookie) {
      return res.status(401).json({ msg: "Token de atualização não encontrado." });
    }

    const refreshToken = refreshCookie.split("=")[1];

    jwt.verify(refreshToken, process.env.REFRESH, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: "Token inválido ou expirado." });
      }

      req.userId = decoded.id; 
      next();
    });
  } catch (error) {
    console.error("Erro ao verificar refresh token:", error);
    return res.status(500).json({ msg: "Erro no servidor ao validar token." });
  }
};
