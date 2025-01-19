import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext'
  

function SelectOption() {
    const {userCourseInput,setuserCourseInput}=useContext(UserInputContext)
      const handleInputChange = (fliename,value)=>{
          setuserCourseInput(prev=>({
            ...prev,
            [fliename]:value
          }))
      }
  return (
    <div className='px-10 md:px-20 lg:px-44'>
        <div className='grid grid-cols-2 gap-10'>
            <div>
                <label className='text-sm'>🕵️‍♀️Difficulty Level</label>
                <Select onValueChange={(value)=>handleInputChange('level',value)}
                     defaultValue={userCourseInput?.level}>
            <SelectTrigger className="h-14 text-lg">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
        </Select>
            </div>
            <div>
                <label className='text-sm'>⌛Course Duration</label>
                <Select onValueChange={(value)=>handleInputChange('duration',value)}
                    defaultValue={userCourseInput?.duration}>
            <SelectTrigger className="h-14 text-lg">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1 Hours">1 Hours</SelectItem>
                <SelectItem value="3 Hours">2 Hours</SelectItem>
                <SelectItem value="3 Hours">3 Hours</SelectItem>
            </SelectContent>
        </Select>
            </div>
            <div>
                <label className='text-sm'>📺Add Video</label>
                <Select onValueChange={(value)=>handleInputChange('displayVideo',value)}
                    defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="h-14 text-lg">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
            </SelectContent>
        </Select>
            </div>
            <div className="h-14 text-lg">
                <label className='text-sm'>📖No of chapter</label>
                <Input type={"number"}
                placeholder="number only"
                onChange={(e)=>handleInputChange('noOfChapter',e.target.value)}
                defaultValue={userCourseInput?.noOfChapter}/>
            </div>
        

        </div>
    </div>
  )
}

export default SelectOption