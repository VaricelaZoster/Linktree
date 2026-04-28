"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return(
    <div className="flex justify-between h-screen">
      <div className="bg-white w-full">Left</div>
      <div className="bg-yellow-300 w-full">right</div>
    </div>
  )
}