import User from '../models/User.js';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json(novoUser);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors.map(err => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({attributes: ['id', 'nome', 'email']});
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
      const {id, nome, email} = user;
      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar usuário'],
      });
    }
  }

  async update(req, res) {
    try {

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novoDados = await user.update(req.body);
      const { id, nome, email } = novoDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao atualizar usuário'],
      });
    }
  }

  async delete(req, res) {
    try {

      const user = await User.findByPk(req.userId);

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
