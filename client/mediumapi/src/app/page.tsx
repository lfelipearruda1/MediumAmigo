'use client';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <Header />
      <main className="w-full flex justify-start">
        <Sidebar />
        <div className="p-4 flex flex-col w-full">
          <Feed />
        </div>
      </main>
    </div>
  );
}