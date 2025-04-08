"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { supabase } from '@/configs/supabaseClient';
import Link from 'next/link';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


function CourseBasicInfo({course,refreshData,edit=true}) {
   
  const [selectedFile,setselctedFile] =useState()
      
    const onFileSelected = async(event)=>{
        const file = event.target.files[0]
         setselctedFile(URL.createObjectURL(file))
          
          const fileName = Date.now();
          
          
          
          

           
           const { data, error } = await supabase.storage.from('project-image').upload(
              `images/${fileName}.png`, // Path where the image will be stored
              file )
              

           const banner = `https://kgcmjzofsrkpcorqucbe.supabase.co/storage/v1/object/public/project-image/${data?.path}`


          const result = await db.update(CourseList).set({
                courseBanner:banner
                  }).where(eq(CourseList?.id,course?.id));
                  console.log(result)
                  // console.error(course?.courseBanner)
                  

            
      }

  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className=' flex gap-2 font-bold text-3xl items-center'>{course?.courseOutput?.courseName}
                {edit&&  <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)} /> }</h2>
                <p className='text-s text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <HiOutlinePuzzle/>{course?.category}</h2>
              {!edit&&<Link href={'/course/'+course?.courseId+'/start'}>
                  <Button className="w-full mt-5">Start</Button>
               </Link> } 
               
            </div>
            <div>   
                   <label htmlFor='upload-img'> 
                    <Image src={course?.courseBanner ? course?.courseBanner : "/courseDefault.png" } width={300} height={300} alt='Loading...' className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
                    </label> 
                   
                    {edit&&<input type='file' id='upload-img' className='opacity-0' onChange={onFileSelected}/>}
            </div>
        </div>
        
    </div>
  )
}

export default CourseBasicInfo