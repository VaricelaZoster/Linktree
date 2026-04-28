'use client'
import React from 'react'
import { Suspense } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import Menu from './navbarcomponents/Menu';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const router = useRouter()
    const [menuVisible, ismenuVisible] = useState(false)

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        let lastScrollY: number = window.scrollY

        const controlNavbar = () => {
            const currentScrollY: number = window.scrollY
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            }
            else {
                setIsVisible(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener("scroll", controlNavbar)

        return () => window.removeEventListener("scroll", controlNavbar)
    }, [])


    const pathname = usePathname()

    const hiddenPrefixes = ["/login"];

    const hideNavbar = hiddenPrefixes.some((route) =>
        pathname.startsWith(route)
    );

    return (
        <>
            {!hideNavbar && (
                <div className={`fixed ${isVisible ? 'opacity-100 duration-150 top-10' : 'opacity-0 duration-150 -top-10'} z-10 w-[94%] bg-white h-12 md:h-21 mx-17 px-15 py-2 rounded-full flex items-center justify-between`}>
                    <div className='flex items-center gap-10 '>
                        <div className='flex text-xl md:text-4xl font-medium cursor-pointer items-center' onClick={() => router.push('/')}>
                            <div>Linktree</div>
                        </div>
                        <div className='group hidden [@media(min-width:1133px)]:flex text-semibold font-small gap-6 items-center'>
                            <div className='p-2.5 rounded-md duration-200 cursor-pointer hover:bg-gray-200 '>Products</div>
                            <div className='p-2.5 rounded-md duration-200 cursor-pointer hover:bg-gray-200 '>Templates</div>
                            <div className='p-2.5 rounded-md duration-200 cursor-pointer hover:bg-gray-200 '> Marketplace</div>
                            <div className='p-2.5 rounded-md duration-200 cursor-pointer hover:bg-gray-200 '>Learn</div>
                            <div className='p-2.5 rounded-md duration-200 cursor-pointer hover:bg-gray-200 '>Pricing</div>
                        </div>
                    </div>
                    <div className='flex justify-between gap-3 text-sm md:text-lg font-md'>
                        <div onClick={() => router.push(`/login?callbackUrl=${pathname}`)} className='bg-[#eff0ec] hover:bg-[#e9e9e9] items-center md:p-4 md:px-6 rounded-lg duration-150 cursor-pointer hidden [@media(min-width:500px)]:flex '>Log in</div>
                        <div onClick={() => router.push('/signup')} className='bg-[#1e2330] hover:bg-[#262d3e] items-center p-4 px-6 rounded-full text-white cursor-pointer hidden [@media(min-width:500px)]:flex duration-150'>Sign up free</div>
                        <div onClick={() => ismenuVisible(!menuVisible)} className='items-center flex [@media(min-width:1133px)]:hidden'><Bars3Icon className='h-9' /></div>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className={`absolute top-25 left-0 w-full transition-all [@media(min-width:1133px)]:hidden transform duration-200 ${menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                            <Menu />
                        </div>
                    </Suspense>
                </div>
            )}

        </>
    )
}

export default Navbar