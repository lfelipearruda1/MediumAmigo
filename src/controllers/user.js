import User from '../models/User.js';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      return res.json(novoUser);
    } catch (e) {
      return res.status(500).json({
        errors: e.error.map(err => err.message)
      });
    }
  }
}

export default new UserController();
