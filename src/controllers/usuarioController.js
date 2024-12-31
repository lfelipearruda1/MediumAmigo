import User from '../models/User.js';

class usuarioController {
  async index(req, res) {
    try {
      const usuarios = await User.findAll();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
    }
  }

  async store(req, res) {
    try {
      const usuario = await User.create(req.body);
      return res.status(201).json(usuario);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const usuario = await User.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          errors: ['Usuário não encontrado.'],
        });
      }

      return res.json(usuario);
    } catch (e) {
      return res.status(500).json({
        errors: [e.message],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const usuario = await User.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          errors: ['Usuário não encontrado.'],
        });
      }

      await usuario.destroy();
      return res.json({
        message: 'Usuário apagado com sucesso.',
      });
    } catch (e) {
      return res.status(500).json({
        errors: [e.message],
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const usuario = await User.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          errors: ['Usuário não encontrado.'],
        });
      }

      const usuarioAtualizado = await usuario.update(req.body);
      return res.json(usuarioAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }
}

export default new usuarioController();
