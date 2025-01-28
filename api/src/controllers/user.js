class UserController {

  static async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter usuário' });
    }
  }
}

export default UserController;
