'use client';

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export default function Home() {
  const router = useRouter();

  const { data, error, isSuccess, isError } = useQuery({
    queryKey:["refresh"],
    queryFn:()=>makeRequest.get("auth/refresh").then((res)=>{
      return res.data
    }),
    retry: false,
    refetchInterval: 60 * 50 * 1000,  
  });

  if (isSuccess){
    console.log(data.msg)
  }
 
  if (isError){
    console.log(error)
    //router.push('/login')
  }

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