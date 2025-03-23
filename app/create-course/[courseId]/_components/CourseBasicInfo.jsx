import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { supabase } from '@/configs/supabaseClient';


function CourseBasicInfo({course,refreshData}) {
   
  const [selectedFile,setselctedFile] =useState()
      
    const onFileSelected = async(event)=>{
        const file = event.target.files[0]
          
          const fileName = Date.now()
          console.log(file)
          
          const { data: user, error1 } = await supabase.auth.getUser();
          console.log("User:", user);

           
            const { data, error } = await supabase.storage.from('profile-image').upload(
              `images/${fileName}.png`, // Path where the image will be stored
              file )
            if (error) {
              console.error('Error uploading image:', error)
            } else {
              console.log('Image uploaded successfully:', data)
              // Return the public URL of the uploaded image
              return data.path
            }
           
          
        
      }

  return (
    <div className='p-10 border rounded-xl shadow-lg mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className=' flex gap-2 font-bold text-3xl items-center'>{course?.courseOutput?.courseName}
                  <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)} /> </h2>
                <p className='text-s text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <HiOutlinePuzzle/>{course?.category}</h2>
               <Button className="w-full mt-5">Start</Button>
            </div>
            <div>   
                   <label htmlFor='upload-img'> 
                    <Image src={selectedFile?selectedFile:"/courseDefault.png"} width={300} height={300} alt='Loading...' className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
                    </label> 
                   
                    <input type='file' id='upload-img' className='opacity-0' onChange={onFileSelected}/>
            </div>
        </div>
        
    </div>
  )
}

export default CourseBasicInfo