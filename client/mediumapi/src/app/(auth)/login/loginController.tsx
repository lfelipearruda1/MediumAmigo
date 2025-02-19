import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../../axios";
import { UserContext } from "@/app/context/UserContext";

export const useLoginController = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("O campo de email é obrigatório.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("O campo de senha é obrigatório.");
      setLoading(false);
      return;
    }

    try {
      const response = await makeRequest.post("/api/auth/login", { email, password });

      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        setError("Ocorreu um erro ao realizar o login.");
      }
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setError(err.response?.data?.msg || "Erro ao tentar realizar o login. Tente novamente.");
    } finally {
      setLoading(false);
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
    loading,
    handleLogin,
    handleSkipLogin,
    isClient,
  };
};
