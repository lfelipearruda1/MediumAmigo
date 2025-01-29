import React, { useState } from 'react';
import { FaHeart, FaBookmark, FaComment } from 'react-icons/fa';

interface IPost {
  id: number;
  post_desc: string;
  img: string;
  username: string;
  userImg: string;
}

function Post(props: { post: IPost }) {
  const { post_desc, img, username, userImg, id } = props.post;

  // Estados para "curtir" e "salvar"
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [savedPosts, setSavedPosts] = useState<{ [key: number]: boolean }>({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // Função para lidar com "curtir"
  const handleLike = (id: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + (likedPosts[id] ? -1 : 1) : 1,
    }));
  };

  const handleSave = (id: number) => {
    setSavedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Funções para o modal de imagem
  const openImageModal = (img: string) => {
    setModalImage(img);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
      <header className="flex items-start mb-4">
        {/* Foto de Perfil do Usuário e Nome */}
        <div className="flex items-center gap-4 mr-4">
          <img
            src={userImg || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
            alt="Imagem do usuário"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-semibold text-lg">{username}</span>
        </div>

        {/* Data */}
        <div className="ml-auto text-sm text-gray-500">
          <span>06/01/2024</span>
        </div>
      </header>

      {/* Descrição do Post */}
      {post_desc && (
        <div className="mb-4">
          <p className="text-gray-700">{post_desc}</p>
        </div>
      )}

      {/* Imagem do Post */}
      {img && (
        <div className="cursor-pointer" onClick={() => openImageModal(img)}>
          <img
            src={img}
            alt="Imagem do Post"
            className="w-64 h-64 object-cover rounded-lg ml-auto"
          />
        </div>
      )}

      {/* Botões de interação */}
      <div className="mt-4 flex gap-4 text-gray-500">
        <button
          onClick={() => handleLike(id)}
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <FaHeart
            className={`text-lg ${likedPosts[id] ? "text-red-500" : "text-gray-500"}`}
          />
          <span className="text-sm">Curtir</span>
          <span className="text-sm font-semibold">({likeCounts[id] || 0})</span>
        </button>

        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
          <FaComment className="text-lg" />
          <span className="text-sm">Comentar</span>
        </button>

        <button
          onClick={() => handleSave(id)}
          className="flex items-center gap-2 hover:text-yellow-500 transition-colors"
        >
          <FaBookmark
            className={`text-lg ${savedPosts[id] ? "text-yellow-500" : "text-gray-500"}`}
          />
          <span className="text-sm">Salvar</span>
        </button>
      </div>

      {/* Modal de imagem */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-white text-xl"
            >
              X
            </button>
            <img
              src={modalImage}
              alt="Imagem Modal"
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;