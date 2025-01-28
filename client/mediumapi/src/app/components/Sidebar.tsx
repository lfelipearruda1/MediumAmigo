import Link from "next/link";
import { FaAlignLeft, FaUserFriends } from "react-icons/fa";

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 h-full text-white flex flex-col p-4">
            <nav className="space-y-4">
                {/* Perfil do Usuário */}
                <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                    <img
                        src="/profile-placeholder.png" // Alterar para o caminho da imagem do perfil
                        alt="Foto do Usuário"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-lg font-medium">Usuário</span>
                </Link>

                {/* Link para Amigos */}
                <Link href="/friends" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                    <FaUserFriends size={20} />
                    <span className="text-base">Amigos</span>
                </Link>

                {/* Link para Feed */}
                <Link href="/feed" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                    <FaAlignLeft size={20} />
                    <span className="text-base">Feed</span>
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
