'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../../axios";

export const useLoginController = () => {
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
