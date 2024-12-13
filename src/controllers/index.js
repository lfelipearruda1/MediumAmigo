class IndexController {
  async index(req, res) {
    try {
      return res.json({ message: "Bem-vindo à API!" });
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor." });
    }
  }
}

export default new IndexController();
