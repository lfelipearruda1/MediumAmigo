'use client';

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const value = localStorage.getItem("mediumapi");
    if (!value) {
      //router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <Header />
      <main className="w-full flex justify-start">
        <Sidebar />
        <div className="p-4 flex flex-col">
          <h1 className="text-2xl font-bold">Bem-vindo à Home!</h1>
          <p className="mt-2 text-gray-700">Aqui você pode personalizar o conteúdo principal da sua aplicação.</p>
        </div>
      </main>
    </div>
  );
}
