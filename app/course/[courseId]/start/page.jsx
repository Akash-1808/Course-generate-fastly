"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({params}) {
    const param = use(params)
    const [course,setCourse]=useState()
    const [selectedChapter,setselectedChapter] = useState()
    const [chapterContent,setChapterContent] = useState()
    useEffect(()=>{
        GetCourse() && GetSelectedChapterContent();
        
    },[])
    const GetCourse=async()=>{
        const result = await db.select().from(CourseList).where(eq(CourseList?.courseId,param?.courseId))
        setCourse(result[0]);
        // console.log(result)
        
    }

    const GetSelectedChapterContent = async(chapterId)=>{
            
        try{
            const result = await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)));
        // console.log(result)
        setChapterContent(result[0])
        
        } catch (error) {
            console.log(error)
        } 
    }


  return (
    <div>
        {/* Chapter List Side Bar */}
        <div className='fixed md:w-64 hidden md:block h-screen border-r shadow-sm rounded-sm'><h2 className='font-medium text-lg bg-primary p-4 text-white'>{course?.courseOutput?.courseName}</h2>
        <div>
            {course?.courseOutput?.chapters.map((chapter,index)=>{
                 return(
                    <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.chapterName==chapter?.chapterName&&'bg-purple-100'}`}
                    onClick={()=>{setselectedChapter(chapter);
                        GetSelectedChapterContent(index)
                    }}>
                        <ChapterListCard chapter={chapter} index={index}/>
                    </div>
                 )   
            })}
        </div>
         </div>
         <div className='md:ml-72'>
            <ChapterContent chapter={selectedChapter} content={chapterContent}/>
        </div>
            
    
        
    </div>
  )
}

export default CourseStart