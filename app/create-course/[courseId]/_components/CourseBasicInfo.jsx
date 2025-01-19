import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';

function CourseBasicInfo({course}) {
  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className=' flex gap-2 font-bold text-3xl items-center'>{course?.courseOutput?.courseName}<EditCourseBasicInfo course={course} /> </h2>
                <p className='text-s text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <HiOutlinePuzzle/>{course?.category}</h2>
               <Button className="w-full mt-5">Start</Button>
            </div>
            <div>   
                   <label htmlFor='upload-img'> 
                    <Image src={"/courseDefault.png"} width={300} height={300} alt='Loading...' className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
                    </label> 
                   
                    <input type='file' id='upload-img' className='opacity-0'/>
            </div>
        </div>
        
    </div>
  )
}

export default CourseBasicInfo