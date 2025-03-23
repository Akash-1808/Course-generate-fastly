"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq, param } from 'drizzle-orm'
import React, { use, useCallback, useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import CourseLesson from './_components/CourseLesson'
import { Button } from '@/components/ui/button'


function CourseLAyout({params}) {
    const param = use(params)
    const {user} = useUser()
    const [course,setcourse] =useState()
    
  useEffect(()=>{
    
    param&&GetCourse()
    
  },[param,user])

 const GetCourse = async()=>{
   
            const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId,param?.courseId)),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
            setcourse(result[0]) 
                console.log(result)
        }

 const GenerateChapterContent=()=>{
  const chapters =course?.courseOutput?.chapters;
  chapters.forEach((chapter,index)=>{
    const PROMPT = "Explain the concept in Detail on Topic:"+course?.name+",Chapter:"+chapter?.name+"in JSON Format with a list of array with field as the description in detail, Code Example (Code feild in <precode> format) if applicable"
    console.log(PROMPT)
  })
  
 }
 
  return (
      
      <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className='font-bold text-center text-2xl'>CourseLayout</h2>


        {/* Basic Info */}
          <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
        {/* Course Detail */}
            <CourseDetail course={course}/>
        {/* List of Lesson */}
        <CourseLesson course={course} refreshData={()=>GetCourse()}/>

      <Button onClick={GenerateChapterContent} className='my-10 '> Genrate Course Content</Button>
        </div>
    
  )
}

export default CourseLAyout