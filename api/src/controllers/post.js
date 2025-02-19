import { db } from "../connect.js";

export const creatPost = (req, res) => {
  const { post_desc, img, userId } = req.body;

  if (!post_desc && !img) {
    return res.status(422).json({ msg: "O post precisa ter um texto ou uma imagem!" });
  }

  const query = "INSERT INTO posts (post_desc, img, userId) VALUES (?, ?, ?)";
  const values = [post_desc, img, userId];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error("Erro ao criar post:", error);
      return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde." });
    }

    return res.status(201).json({ msg: "Post enviado com sucesso!", postId: result.insertId });
  });
};

export const getPost = (req, res) => {
  const query = "SELECT p.*, username, userImg FROM posts as p JOIN user as u ON (u.id = p.userId) ORDER BY created_at DESC";

  db.query(query, (error, data) => {
    if (error) {
      console.error("Erro ao buscar posts:", error);
      return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde." });
    }

    return res.status(200).json(data);
  });
};
