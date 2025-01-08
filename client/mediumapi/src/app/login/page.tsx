"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("O campo de email é obrigatório.");
            return;
        }
        if (!password) {
            setError("O campo de senha é obrigatório.");
            return;
        }

        try {
            console.log("Attempting to log in with:", { email, password });
            const response = await axios.post("http://localhost:8001/api/auth/login", { email, password });
            console.log("Login successful:", response.data);
            alert("Login realizado com sucesso!");
        } catch (err) {
            console.error("Login failed:", err);
            setError("Email ou senha incorretos. Tente novamente.");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
                onSubmit={handleLogin}
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">LOGIN</h1>

                {error && (
                    <div className="mb-4 text-red-500 text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="text"
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
                    ENTRAR
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-blue-500 font-medium hover:underline">
                        Cadastrar-se
                    </Link>
                </p>
            </form>
        </main>
    );
}

export default Login;
