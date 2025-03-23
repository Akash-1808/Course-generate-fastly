import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'

const EditChapter = ({course,index,refreshData}) => {
  const [name,setName] = useState()
  const [description,setdescription] = useState()

      const CourseOutput = course?.courseOutput?.chapters[index]
      
      
       useEffect(()=>{
            setName(course?.courseOutput?.courseName)
            setdescription(course?.courseOutput?.description)
              },[course,index])


  const onUpdateHandler = async() =>{
    CourseOutput.chapterName = name
    CourseOutput.about = description
    const result = await db.update(CourseList).set({
      courseOutput:course?.courseOutput
    }).where(eq(CourseList?.id,course?.id)).returning({id:CourseList.id});

    refreshData(true)
  }

  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label className='text-xl'>Chapter Title</label>
            <Input defaultValue={CourseOutput?.chapterName}
            onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label className='text-xl'>Description</label>
            <Textarea className="h-40" defaultValue={CourseOutput?.about}
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

export default EditChapter