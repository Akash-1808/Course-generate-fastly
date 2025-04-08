"use client"
import { UserButton } from '@clerk/nextjs'

import React from 'react'
import DashBoardlayout from './layout'
import AddCourse from './_components/AddCourse'
import CourseList from './_components/UserCourseList'
import UserCourseList from './_components/UserCourseList'
import CourseCard from './_components/CourseCard'

function Dashboard() {
  return (
    <div>
      <AddCourse/>
      
      <UserCourseList/>
      
    </div>
  )
}

export default Dashboard