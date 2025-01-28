import Link from "next/link";
import { FaAlignLeft, FaUserFriends, FaBookmark } from "react-icons/fa";

function Sidebar() {
    // Exemplo de lógica para verificar a imagem do usuário
    const userImage = null; // Substitua por lógica real para verificar a imagem do usuário
    const defaultImage = "https://img.freepik.com/free-icon/user_318-159711.jpg";

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 pt-8">
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={userImage || defaultImage} // Use o defaultImage se userImage for null ou undefined
                    alt="Foto do Usuário"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                />
                <span className="text-xl font-semibold">Usuário</span>
            </div>
            <nav className="flex flex-col gap-6">
                <Link 
                    href="/friends" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                    <FaUserFriends size={20} />
                    <span className="text-lg">Amigos</span>
                </Link>
                <Link 
                    href="/feed" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                    <FaAlignLeft size={20} />
                    <span className="text-lg">Feed</span>
                </Link>
                <Link 
                    href="/saved" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                    <FaBookmark size={20} />
                    <span className="text-lg">Salvos</span>
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
