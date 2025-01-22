'use client';

import Image from "next/image";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    let value = localStorage.getItem("mediumapi");
    if (!value){
      router.push("/login");
    }
  })

  return (
      <main className="flex min-h-screen flex-col items-center justify-berween bg-zinc-100">
        <Header/>
      </main>
  );
}
