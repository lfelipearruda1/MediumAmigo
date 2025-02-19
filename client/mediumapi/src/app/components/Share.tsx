import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { makeRequest } from "../../../axios";
import { object } from "zod";

function Share() {
    const { user } = useContext(UserContext);
    const [post_desc, setDesc] = useState('');
    const [postImg, setPostImg] = useState('');
    const [img, setImg] = useState<File | null>(null);

    const queryCliente = useQueryClient();

    useEffect(() => {
        if (img) {
            setPostImg(URL.createObjectURL(img));   
        }
    }, [img]);

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

    const upload = async () => {
        try {
            const formData = new FormData();
            if (img) formData.append('file', img);
            const res = await makeRequest.post('upload/', formData);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    
    const sharePost = async () => {
        let imgUrl = '';
        if (img) {
            imgUrl = await upload();
        }
        console.log("Dados do post:", { post_desc, img: imgUrl, userId: user?.id });
        mutation.mutate({ post_desc, img: imgUrl, userId: user?.id });
        setDesc('');
        setImg(null);
    };

    return (
        <div className="w-1/3 bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4 border border-gray-200">
            {img && <img className="rounded-lg" src={postImg} alt= "imagem do post"/>}
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
                        onClick={()=> sharePost()}
                    >
                        <FaPaperPlane className="text-xl" />
                    </button>
                </div>
            </div>
            <div className="flex justify-around py-4 text-gray-600 border-y">
                <input className="hidden" type="file" id="img" onChange={(e)=>e.target.files && setImg(e.target.files[0])}/>
                <label htmlFor="img" className="flex">
                    <TbPhoto className="text-2xl" /> Adicionar Imagem
                </label>
                <button className="flex items-center gap-1">
                    <FaUserFriends className="text-2xl" /> Marcar Amigo
                </button>
            </div>
        </div>
    );
}

export default Share;
