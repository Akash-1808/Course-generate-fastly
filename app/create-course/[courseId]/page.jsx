"use client"
import { db } from '@/configs/db'
import { Chapters,CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq, param } from 'drizzle-orm'
import React, { use, useCallback, useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import CourseLesson from './_components/CourseLesson'
import { Button } from '@/components/ui/button'
import { GenerateChapterLayout_AI } from '@/configs/AiModel'
import LoadingDailog from '../_components/LoadingDailog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'


function CourseLAyout({params}) {
    const param = use(params)
    const {user} = useUser()
    const [course,setcourse] =useState()
    const [Loading,setloading] = useState(false)
    const router =useRouter()


  useEffect(()=>{
    
    param&&GetCourse()
    
  },[param,user])

 const GetCourse = async()=>{
   
            const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId,param?.courseId)),eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
            setcourse(result[0]) 
                
        }

 const GenerateChapterContent= ()=>{
  setloading(true)
  const chapters =course?.courseOutput?.chapters;
  
  chapters.forEach(async(chapter,index)=>{
    const PROMPT = "Explain the concept in Detail on Topic:"+course?.name+",Chapter:"+chapter?.chapterName+"in JSON Format with a list of array with field as the description in detail, Code Example (Code feild in <precode> format) if applicable"
    

    // if(index==0){
      try {

        let videoId=''
        //Generate Url
          await service.getVideos(course?.name+':'+chapter?.name).then( resp=>{
                      console.log(resp)
                      videoId = resp[0]?.id?.videoId
                    }   )
//generate Chapter Data
        const result = await GenerateChapterLayout_AI.sendMessage(PROMPT)

        // console.log(result?.response?.text())
        const content = JSON.parse(result?.response?.text())
          
         
          //Save Chapter Content + video Url
          await db.insert(Chapters).values(
            {
              chapterId:index,
              courseId:course?.courseId,
              content:content,
              videoId:videoId
            }
          )
          await db.update(CourseList).set({
        publish:true
          }).where(param.courseId)

      } catch (error) {
        console.log(error)
      }
      setloading(false)
      
      router.replace('/create-course/'+course?.courseId+"/finish")
    
  })
  
 }
 
  return (
      
      <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className='font-bold text-center text-2xl'>CourseLayout</h2>

        <LoadingDailog loading={Loading}></LoadingDailog>
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