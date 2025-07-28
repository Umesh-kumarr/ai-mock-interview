"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'


function Header() {


    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [path]);


  return (
    <div className='flex p-4 items-centre justify-between bg-secondary shadow-sm'>
      <div className="flex items-center gap-2">
      <Image src={'/l.svg'} width={40} height={10} alt='logo'/>
      <h2 className='text-3xl  font-sans font-bold'>MOCKMATE</h2>
      </div >
      <ul className='hidden md:flex gap-6 m-2'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard'&&'text-primary font-bold'}`}>Dashboard
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade
        </li>

        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path=='/dashboard/how'&&'text-primary font-bold'}`}>How it Works
        </li>
      </ul>
      <UserButton/>
      </div>
  )
}

export default Header
