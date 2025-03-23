"use client"
import Image from 'next/image'

import React from 'react'
import { IoHomeOutline, IoShieldCheckmarkOutline, IoPowerOutline } from "react-icons/io5";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"

function SideBar() {
    const Menu =[
        {
            id:1,
            name:'Home',
            icon:<IoHomeOutline />,
            path:'/dashboard'

        },
        {
            id:2,
            name:'Explore',
            icon:<HiOutlineSquare3Stack3D />,
            path:'/dashboard/explore'

        },
        {
            id:3,
            name:'Upgrade',
            icon:<IoShieldCheckmarkOutline />,
            path:'/dashboard/upgrade'
            
        },
        {
            id:4,
            name:'Logout',
            icon:<IoPowerOutline />,
            path:'/dashboard/logout'

        },

    ]
    const path = usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={"/file.svg"} width={50} height={50} alt={'Loading'}/>
        <hr className='my-5' />
            
        <ul>
            {Menu.map((item,index)=>{
               return <Link href={item.path} key={index}>
                    <div className={`flex items-center gap-2 text-gray-600 p-4 cursor-pointer hover:bg-gray-100 hover:text-black rounded-sm mb-3 ${item.path==path&&'bg-gray-100 text-black'}`}>
                    <div className='text-2xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            })}
        </ul>

        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={33}/>
            <h2 className='text-sm mt-1 mb-2'>3 Out of 5 Course Created</h2>
            <h2 className='text-xs text-gray-400'>Upgrade your plan to unlimited course generate</h2>
        </div>
    </div>
  )
}

export default SideBar