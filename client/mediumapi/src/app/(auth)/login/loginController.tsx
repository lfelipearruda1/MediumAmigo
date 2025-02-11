import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../../axios";
import { UserContext } from "@/app/context/UserContext";

export const useLoginController = () => {
  const [email, setEmail] = useState<string>("teste@gmail.com");
  const [password, setPassword] = useState<string>("12345");
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false); // Declaração do estado isClient

  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o componente está sendo renderizado no lado do cliente
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
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
      
      console.log("Login bem-sucedido:", response.data); // Verifique a estrutura da resposta
      if (response.data?.user) {
        setUser(response.data.user);
        // Armazenar token, caso seja necessário
        // localStorage.setItem("token", response.data.token); // Exemplo de como armazenar o token
        router.push("/dashboard");
      } else {
        setError("Ocorreu um erro ao realizar o login.");
      }
    } catch (err) {
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
