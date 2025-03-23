import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-select'
import { HiPencilSquare } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'


  

function EditCourseBasicInfo({course,refreshData}) {
    
    const [name,setName] = useState()
    const [description,setdescription] = useState()
   
   
    const onUpdateHandler = async()=>{
        course.courseOutput.description = description;
        course.courseOutput.courseName= name
        const result = await db.update(CourseList).set({
          courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        .returning({id:CourseList.id});
       
       
        refreshData(true)
        }
    useEffect(()=>{
      setName(course?.courseOutput?.courseName)
      setdescription(course?.courseOutput?.description)
        },[course])

          
  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edt Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label className='text-xl'>Course Title</label>
            <Input defaultValue={course?.courseOutput?.courseName}
            onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label className='text-xl'>Description</label>
            <Textarea className="h-40" defaultValue={course?.courseOutput?.description}
            onChange={(e)=>setdescription(e.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

   


export default EditCourseBasicInfo