"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq, param } from 'drizzle-orm'
import React, { use, useCallback, useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import CourseLesson from './_components/CourseLesson'


function CourseLAyout({params}) {
    
    const {user} = useUser()
    const [course,setcourse] =useState()
    
  useEffect(()=>{
    
    params&&GetCourse()
    
  },[params,user])

 const GetCourse = async()=>{
   
    const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseId)),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
     setcourse(result[0]) 
    console.log(result)
        }
 
  return (
      
      <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className='font-bold text-center text-2xl'>CourseLayout</h2>


        {/* Basic Info */}
          <CourseBasicInfo course={course}/>
        {/* Course Detail */}
            <CourseDetail course={course}/>
        {/* List of Lesson */}
        <CourseLesson course={course}/>


        </div>
    
  )
}

export default CourseLAyout