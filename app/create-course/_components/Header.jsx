import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
   
        <div className='flex justify-between p-5 shadow-sm'>
                <Image src={'/COURSEGEN.svg'} width={150} height={150} alt='loading'/>
                <UserButton/>
            </div>
    
  )
}

export default Header