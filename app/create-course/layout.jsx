"use client"
import React, { useState } from 'react'

import { UserInputContext } from '../_context/UserInputContext'
import Header from './_components/Header'

function CreateCousrelayout({children}) {
      const [userCourseInput,setuserCourseInput] = useState([])

  return (
    <div>
      <UserInputContext.Provider value={{userCourseInput,setuserCourseInput}}>
        <Header/>
        {children}
      </UserInputContext.Provider>
        
        </div>
  )
}

export default CreateCousrelayout