class UserController {
  async index(req, res) {
    try {
      return res.json('Index');
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  }
}

export default new UserController();
