import { registerUser, loginUser, refreshTokenService, logoutUser } from "../services/auth.js";

export const register = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    return res.status(response.status).json({ msg: response.msg });
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor. Tente novamente mais tarde." });
  }
};

export const login = async (req, res) => {
  try {
    const { status, msg, user, accessToken, refreshToken } = await loginUser(req.body);

    if (status === 200) {
      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json({ msg, user });
    }

    return res.status(status).json({ msg });
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor. Tente novamente mais tarde." });
  }
};

export const refresh = async (req, res) => {
  try {
    const { status, msg, accessToken, refreshToken } = await refreshTokenService(req.cookies);

    if (status === 200) {
      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json({ msg });
    }

    return res.status(status).json({ msg });
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao processar a requisição." });
  }
};

export const logout = async (req, res) => {
  return logoutUser(res);
};
