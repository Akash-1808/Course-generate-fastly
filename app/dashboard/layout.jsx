import React from 'react'
import SideBar from './_components/SideBar'
import Explore from './explore/page'
import Header from '../_components/Header'



function DashBoardlayout({children}) {
  return (
    <div>
        <div className='md:w-64 hidden md:block'>
           <SideBar/>
        </div>
        <div className='md:ml-64'>
            <Header/>
            <div className='p-10'>{children}</div>
        </div>
    </div>
  )
}

export default DashBoardlayout