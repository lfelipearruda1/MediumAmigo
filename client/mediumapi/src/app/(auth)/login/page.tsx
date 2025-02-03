'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../../axios";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("O campo de email é obrigatório.");
      return;
    }

    if (!password.trim()) {
      setError("O campo de senha é obrigatório.");
      return;
    }

    try {
      const response = await makeRequest.post("/api/auth/login", { email, password });
      console.log("Login bem-sucedido:", response.data);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError("Email ou senha incorretos. Tente novamente.");
    }
  };

  const handleSkipLogin = () => {
    router.push("/dashboard");
  };

  if (!isClient) {
    return null;
  }

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
};

export default LoginPage;
