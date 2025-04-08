"use client"
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { HiViewGrid } from "react-icons/hi";
import { HiClipboardDocumentCheck, HiLightBulb } from 'react-icons/hi2';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout, GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDailog from './_components/LoadingDailog';
import { uuid } from 'drizzle-orm/pg-core';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { UserProfile } from '@clerk/clerk-react';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const Stepper = [{
        id:1,
        name:"Category",
        icon:<HiViewGrid/>
    },
    {
        id:2,
        name:"Topic & Desc",
        icon:<HiLightBulb/>
    },
    {
        id:3,
        name:"Options",
        icon:<HiClipboardDocumentCheck/>
    }]
        const {userCourseInput,setuserCourseInput}=useContext(UserInputContext)
        const [Loading,setLoading] = useState(false)
        const router =useRouter()
        const {user} = useUser()
        useEffect(()=>{
            // console.log(userCourseInput)

        },[userCourseInput])

            const checkStatus = ()=>{
                if(userCourseInput?.length==0){
                  return  true
                }
                if(activeIndex==0&&(userCourseInput?.category?.length==0 || userCourseInput?.category==undefined)){
                    return true
                }
                if(activeIndex==1&&(userCourseInput?.topic?.length==0||userCourseInput?.topic==undefined)){
                    return true
                }
                else if(activeIndex==2&&(userCourseInput?.level==undefined ||userCourseInput?.duration==undefined||userCourseInput?.noOfChapter==undefined || userCourseInput?.displayVideo==undefined)){
                    return true
                }
                return false
            }

            const GenerateCourseLayout = async()=>{
                    setLoading(true)
                    const BASIC_PROMT ="Generate a Course Tutorial on the Following details With the field as Course name, Description, Along with Chapter name, about, Duration:"
                    const USER_INPUT_PROMT = 'Category: '+userCourseInput?.category+', Topic: '+userCourseInput?.topic+', Level: '+UserInputContext?.level+', Duration: '+userCourseInput?.duration+', No of chapters: '+userCourseInput?.noOfChapter+' in JSON format\n'
                    const FINAL_PROMT = BASIC_PROMT+USER_INPUT_PROMT
                    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMT)
                    

                    SaveCourseLayoutInDb(JSON.parse(result.response?.text()))
                    setLoading(false)
            }


            const SaveCourseLayoutInDb= async(courseLayout)=>{
               
              try { 
                var id = uuid4()
                setLoading(true)
                 const result = await db.insert(CourseList).values({
                        courseId:id,
                        name:userCourseInput?.topic,
                        level:userCourseInput?.level,
                        category:userCourseInput?.category,
                        courseOutput:courseLayout,
                        createdBy:user?.primaryEmailAddress?.emailAddress,
                        userName:user?.fullName,
                        userProfileImage:user?.imageUrl
                })
                // console.log(id)
                setLoading(false);
                router.replace('/create-course/'+id)
              } catch (error) {
                console.log(error)
              } 
                console.log("finish");
            }



    const [activeIndex,setactiveIndex]= useState(0)
  return (
    <div>
        <div className='flex flex-col justify-center items-center mt-10'>
            <h2 className='text-2xl text-primary font-medium'>Create Course</h2>
             <div className='flex'>
                {Stepper.map((item,index)=>(
                    <div className='flex items-center' key={index}>
                        <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                           <div className={`bg-gray-200 p-3 rounded-full text-white
                            ${activeIndex>=index && 'bg-purple-500'}`}>{item.icon}</div> 
                            <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                        </div>
                     {index!=Stepper?.length-1 &&<div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex-1>=index && 'bg-purple-500'}`}></div>}
                    </div>
                ))}
             </div>
        </div>

        <div className='px-10 md:px-20 lg:px-44 mt-10'>

            {activeIndex==0?<SelectCategory/>:activeIndex==1?<TopicDescription/>:<SelectOption/>}
            <div className='flex justify-between mt-10'>
                    <Button disabled={activeIndex==0} onClick={()=>setactiveIndex(activeIndex-1)} variant='outline'>Previous</Button>
                    {activeIndex<2 && <Button disabled={checkStatus()} onClick={()=>{ 
                        setactiveIndex(activeIndex+1)}}>Next</Button>}
                       {activeIndex==2 && <Button disabled={checkStatus()} onClick={()=>{  
                        GenerateCourseLayout()}}>Generate Course Layout</Button>} 
            </div>
        </div>
             <LoadingDailog loading={Loading}/>   
    </div>
  )
}

export default CreateCourse