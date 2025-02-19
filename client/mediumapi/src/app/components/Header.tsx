"use client";

import { FaSearch, FaBell } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { UserContext } from "../context/UserContext";

function Header() {
    const { user, setUser } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const mutation = useMutation({
        mutationFn: async () => {
            return await makeRequest.post("auth/logout").then((res) => res.data);
        },
        onSuccess: () => {
            setUser(null);
            localStorage.removeItem("mediumapi:user");
            router.push("/login");
        },
    });

    return (
        <>
            <header className="w-full bg-white flex justify-between py-3 px-6 items-center shadow-md">
                <a
                    href="/"
                    className="font-bold text-sky-900 text-lg hover:text-sky-600 transition-colors duration-200"
                >
                    MEDIUM
                </a>

                <div className="flex items-center border rounded-full px-3 py-1 shadow-sm bg-gray-100 hover:bg-gray-300 transition-colors duration-200">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="outline-none bg-transparent text-gray-600 placeholder-gray-500 px-2 w-64"
                    />
                    <FaSearch className="text-gray-500 hover:text-gray-800 transition-colors duration-200" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center p-1.5 bg-gray-200 rounded-full hover:bg-gray-300">
                            <TbMessageCircle size={24} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center p-1.5 bg-gray-200 rounded-full hover:bg-gray-300">
                            <FaBell size={24} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 relative">
                        <img
                            src={user?.userImg || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                            alt="Imagem do perfil"
                            className="w-10 h-10 rounded-full border hover:brightness-75 transition-all duration-200 cursor-pointer"
                            onClick={toggleMenu}
                        />
                        <span className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-200">
                            {user?.username || "Usuário"}
                        </span>

                        {showMenu && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg border rounded-md w-40 p-2 z-10">
                                <button
                                    className="w-full text-gray-700 hover:text-gray-900 text-left py-2 px-4 transition-colors duration-200"
                                    onClick={() => alert("Editar Perfil")}
                                >
                                    Editar Perfil
                                </button>
                                <button
                                    className="w-full text-red-600 hover:text-red-800 text-left py-2 px-4 transition-colors duration-200"
                                    onClick={() => setShowLogoutModal(true)}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold text-gray-800">Sair da conta</h2>
                        <p className="text-gray-600 mt-2">Tem certeza que deseja sair?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                                onClick={() => mutation.mutate()}
                            >
                                Confirmar Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
