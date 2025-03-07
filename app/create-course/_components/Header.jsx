import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
   
        <div className='flex justify-between p-5 shadow-sm'>
                <Image src={'/globe.svg'} width={50} height={50} alt='loading'/>
                <UserButton/>
            </div>
    
  )
}

export default Header