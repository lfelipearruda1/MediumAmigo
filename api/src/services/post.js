import { db } from "../connect.js";

export const createPostService = async ({ post_desc, img, userId }) => {
  return new Promise((resolve, reject) => {
    if (!post_desc && !img) {
      return reject({ status: 422, msg: "O post precisa ter um texto ou uma imagem!" });
    }

    const query = "INSERT INTO posts (post_desc, img, userId) VALUES (?, ?, ?)";
    const values = [post_desc, img, userId];

    db.query(query, values, (error, result) => {
      if (error) {
        return reject({ status: 500, msg: "Erro ao criar post." });
      }
      resolve({ status: 201, msg: "Post enviado com sucesso!", postId: result.insertId });
    });
  });
};

export const getPostsService = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT p.*, username, userImg FROM posts as p JOIN user as u ON (u.id = p.userId) ORDER BY created_at DESC";

    db.query(query, (error, data) => {
      if (error) {
        return reject({ status: 500, msg: "Erro ao buscar posts." });
      }
      resolve({ status: 200, data });
    });
  });
};
