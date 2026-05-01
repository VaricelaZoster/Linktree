"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const { data: session } = useSession();
  console.log(session)
  

  const router = useRouter()

  const handleClick = async () => {
    const res = await fetch("/api/test", {
      method: "POST",
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex justify-between h-screen">
      <div className="lg:basis-1/2 w-full">
        <div className="flex h-[20%] pt-[5%] pl-[5%] text-4xl font-semibold tracking-normal"><span className="flex h-[40%] cursor-pointer" onClick={() => router.push("/")}>Linktree</span></div>
        <div className="flex  text-3xl font-extrabold justify-center">Welcome back</div>
        <div className="flex  text-lg text-gray-500 justify-center pt-8">Log in to your Linktree</div>
        <div className="flex justify-center py-12">
          <button onClick={() => signIn("github",{callbackUrl:"/admin"})} className="flex justify-center items-center gap-3 p-3 w-[70%] font-bold text-lg tracking-wide antialiased rounded-xl border border-gray-300 hover:border-gray-100 duration-200 ease-out cursor-pointer" >
            <FaGithub className="text-xl"/>
            Continue using Github
          </button>
        </div>
        <button onClick={handleClick} className="mr-60 cursor-pointer">Test</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <div className={`hidden basis-1/2 lg:flex bg-yellow-300 w-full`}>right</div>
    </div>
  )
}