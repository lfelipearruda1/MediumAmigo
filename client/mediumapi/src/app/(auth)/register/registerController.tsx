"use client";

import { useState } from "react";

export function RegisterController() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        let valid = true;
        let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

        if (!name.trim()) {
            newErrors.name = "Nome é obrigatório";
            valid = false;
        }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email inválido";
            valid = false;
        }
        if (password.length < 6) {
            newErrors.password = "A senha deve ter pelo menos 6 caracteres";
            valid = false;
        }
        if (confirmPassword !== password) {
            newErrors.confirmPassword = "As senhas não coincidem";
            valid = false;
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateFields()) return;
        setLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Erro no cadastro");
            }
            
            alert("Cadastro realizado com sucesso!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            alert(error.message || "Erro ao cadastrar. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        handleRegister,
        loading
    };
}
