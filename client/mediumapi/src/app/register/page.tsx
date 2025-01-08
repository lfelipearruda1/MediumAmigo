"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Attempting to register with:", { name, email, password });
            const response = await axios.post("http://localhost:8001/api/auth/register", { 
                name, 
                email, 
                password 
            });
            console.log("Registration successful:", response.data);
            alert("Cadastro realizado com sucesso!");
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Erro ao realizar cadastro. Tente novamente.");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleRegister} 
                className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">CADASTRAR-SE</h1>
                
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite seu nome"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite seu email"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite sua senha"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    CADASTRAR
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-blue-500 font-medium hover:underline">
                        Entrar
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Register;
