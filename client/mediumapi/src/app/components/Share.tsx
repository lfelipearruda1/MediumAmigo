import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { makeRequest } from "../../../axios";

function Share() {
    const { user } = useContext(UserContext);
    const [post_desc, setDesc] = useState('');

    const queryCliente = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newPost: { [key: string]: any }) => {
            const res = await makeRequest.post("post/", newPost);
            return res.data;
        },
        onSuccess: () => {
            queryCliente.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Erro ao criar post:", error);
        },
    });

    const handlePostSubmit = () => {
        if (!post_desc.trim()) return; 

        if (!user?.id) {
            console.error("Usuário não encontrado.");
            return;
        }
        

        mutation.mutate({ post_desc, userId: user?.id });
    };

    return (
        <div className="w-1/3 bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4 border border-gray-200">
            <div className="flex items-center gap-4 pt-6">
                <img
                    src={user?.userImg ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                    alt="Imagem de Perfil"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="w-full bg-zinc-100 flex items-center px-3 py-2 rounded-full shadow-inner">
                    <input
                        placeholder={`No que você está pensando, ${user?.username || "Usuário"}?`}
                        value={post_desc}
                        type="text"
                        className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-500"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <button
                        className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300"
                        onClick={handlePostSubmit}
                    >
                        <FaPaperPlane className="text-xl" />
                    </button>
                </div>
            </div>
            <div className="flex justify-around py-4 text-gray-600 border-y">
                <button className="flex items-center gap-1">
                    <TbPhoto className="text-2xl" /> Adicionar Imagem
                </button>
                <button className="flex items-center gap-1">
                    <FaUserFriends className="text-2xl" /> Marcar Amigo
                </button>
            </div>
        </div>
    );
}

export default Share;
