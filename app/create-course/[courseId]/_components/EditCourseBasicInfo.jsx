import React, { useState } from 'react'
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


  

function EditCourseBasicInfo({course}) {
    
    const [name,setName] = useState()
    const [description,setdescription] = useState()

    const onUpdateHandler = ()=>{
        course.courseOutput.course.description = description;
        course.courseOutput.course.courseName= name
        
        console.log(course)
        }


        console.log(course)     
  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edt Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <Label>Course Title</Label>
            <Input defaultValue={course?.courseOutput?.course?.courseName}
            onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <Label>Description</Label>
            <Textarea defaultValue={course?.courseOutput?.description}
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