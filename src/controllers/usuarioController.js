import User from '../models/User.js';

class usuarioController {
  async index(req, res) {
    try {
      const usuarios = await usuario.findAll();
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }
}

export default new usuarioController();
