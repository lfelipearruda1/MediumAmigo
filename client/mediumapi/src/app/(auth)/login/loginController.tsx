'use client';

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../../axios";
import { UserContext } from "@/app/context/UserContext";

export const useLoginController = () => {
  const [email, setEmail] = useState<string>("teste@gmail.com");
  const [password, setPassword] = useState<string>("12345");
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const {setUser} = useContext(UserContext)
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
      const response = await makeRequest.post("http://localhost:8001/api/auth/login", { email, password });
      console.log("Login bem-sucedido:", response.data.user);
      setUser(response.data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro ao fazer login:", err.message);
        setError("Email ou senha incorretos. Tente novamente.");
      } else {
        console.error("Erro desconhecido", err);
        setError("Ocorreu um erro desconhecido. Tente novamente.");
      }
    }
  };

  const handleSkipLogin = () => {
    router.push("/dashboard");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
    handleSkipLogin,
    isClient,
  };
};
