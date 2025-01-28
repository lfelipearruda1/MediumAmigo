import { useState } from "react";
import { FaBookmark, FaHeart, FaComment } from "react-icons/fa";

const posts = [
  {
    id: 1,
    post_desc: "teste",
    img: "",
    username: "user",
    userImg: "",
  },
  {
    id: 2,
    post_desc: "teste",
    img: "https://png.pngtree.com/background/20230408/original/pngtree-natural-landscape-in-the-forest-with-waterfall-flowing-through-picture-image_2337676.jpg",
    username: "user",
    userImg: "",
  }
];

function Feed() {
  // Gerenciar os estados de "curtir" e "salvar" para cada post
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = (id) => {
    setSavedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openImageModal = (img) => {
    setModalImage(img);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Post Header */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.userImg || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="font-semibold text-lg">{post.username}</span>
          </div>

          <div className="flex justify-between items-start">
            {/* Post Description */}
            <div className="flex-1 mr-4">
              <p className="text-gray-700 text-base">{post.post_desc}</p>
            </div>

            {post.img && (
              <div className="cursor-pointer" onClick={() => openImageModal(post.img)}>
                <img
                  src={post.img}
                  alt="Post Image"
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-4 text-gray-500">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <FaHeart
                className={`text-lg ${likedPosts[post.id] ? "text-red-500" : "text-gray-500"}`}
              />
              <span className="text-sm">Curtir</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <FaComment className="text-lg" />
              <span className="text-sm">Comentar</span>
            </button>
            <button
              onClick={() => handleSave(post.id)}
              className="flex items-center gap-2 hover:text-yellow-500 transition-colors"
            >
              <FaBookmark
                className={`text-lg ${savedPosts[post.id] ? "text-yellow-500" : "text-gray-500"}`}
              />
              <span className="text-sm">Salvar</span>
            </button>
          </div>
        </div>
      ))}

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
              alt="Modal Image"
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
