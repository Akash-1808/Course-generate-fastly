import { AnimatedBackground } from '@/components/ui/animated-background';
import React from 'react'
import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineClock, HiOutlinePlay } from "react-icons/hi";


function CourseDetail({course}) {
        const Menu =[{
                id:1,
                text:"Skill level",
                icon:<HiOutlineChartBar className='text-4xl text-primary' />,
                text2:course?.level,
                },{
                    id:2,
                    text:"Duration",
                    icon:<HiOutlineClock className='text-4xl text-primary' />,
                    text2:course?.courseOutput?.duration,
                    },{
                        id:3,
                        text:"No of Chapters",
                        icon:<HiOutlineBookOpen className='text-4xl text-primary' />,
                        text2:course?.courseOutput?.numberOfChapters,
                        },{
                            id:4,
                            text:"Video Included?",
                            icon:<HiOutlinePlay className='text-4xl text-primary' />,
                            text2:course?.includeVideo,
                            },]


  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
      
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 '>
             <AnimatedBackground
        className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      > 
      {Menu.map((item,index)=>(
        <div key={index} data-id={`card-${index}`}>
            <div className='flex select-none flex-col space-y-1 p-4'>
            <div className='flex gap-2'>
                {item.icon}
                <div>
                    <h2 className='text-xs text-gray-400'>{item.text}</h2>
                    <h2 className='font-medium text-lg'>{item.text2}</h2>
                </div>
            </div>
            </div>
        </div>
      ))}
            </AnimatedBackground>
        </div>
        
    </div>
  )
}

export default CourseDetail