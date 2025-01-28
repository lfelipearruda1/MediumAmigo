'use client';

import Image from "next/image";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"; 
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let value = localStorage.getItem("mediumapi");
    if (!value) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen bg-zinc-100">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Bem-vindo à Home!</h1>
          <p className="mt-2 text-gray-700">Aqui você pode personalizar o conteúdo principal da sua aplicação.</p>
        </div>
      </div>
    </main>
  );
}
