import User from '../models/User.js';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      console.log('USER ID', req.userId);
      console.log('USER EMAIL', req.userEmail);
      return res.json(users);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar usuários'],
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado'],
        });
      }
      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar usuário'],
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novoDados = await user.update(req.body);

      return res.json(novoDados);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao atualizar usuário'],
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy();

      return res.json({
        success: true,
        message: 'Usuário deletado com sucesso',
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao deletar usuário'],
      });
    }
  }
}

export default new UserController();
