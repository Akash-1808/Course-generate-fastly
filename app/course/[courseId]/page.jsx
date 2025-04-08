"use client"
import Header from '@/app/_components/Header'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail'
import CourseLesson from '@/app/create-course/[courseId]/_components/CourseLesson'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'

function Course({params}) {

        const param = use(params)
        const [course,setCourse]= useState()
        
        
        useEffect(()=>{
            params&&GetCourse()
        },[params])

        const GetCourse =async()=>{

            const result = await db.select().from(CourseList).where(eq(CourseList?.courseId,param?.courseId))
            
            setCourse(result[0])
        }

  return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44'>
            <CourseBasicInfo course={course} edit={false}/>
            <CourseDetail course={course}/>
            <CourseLesson course={course} edit={false}/>
        </div>
        
    </div>
  )
}

export default Course