"use client"
import React, { useEffect } from 'react'

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const page = () => {

  const { data: session, status } = useSession();
  const router = useRouter()

  /*useEffect(() => {
   if(!session){
     router.replace("/")
   }
  })*/

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex bg-black text-white justify-center items-center h-1/14'>
        Topbar
      </div>
      <div className='bg-black h-8'>Back</div>
      <div className='bg-white relative -top-8 rounded-t-3xl z-10 h-full'>
        Rest
      </div>
    </div>
  )
}

export default page