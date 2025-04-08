import React from 'react'
import YouTube from 'react-youtube'

const opts = {
  height:'390',
  width:'640',
  playerVars:{
    autoplay:0
  }
}

function ChapterContent({chapter,content}) {
  console.log(content)
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>
          {chapter?.chapterName}
        </h2>
        <p className='text-gray-500'>{chapter?.about}</p>
        {/* Video */}
       <div className='flex justify-center my-10'><YouTube videoId={content?.videoId} opts={opts}/></div> 
        {/* Contetnt */}
        <div>
          {content?.content?.topics ? content?.content?.topics?.map((item,index)=>{
              return(
                <div className='p-5 bg-sky-50 mb-3 rounded' key={index}>
                <h2 className='font-medium text-lg'>{item.topic}</h2>
                {/* <p className='whitespace-pre-wrap'>{item?.description?.map((detail,index)=>{
                 return(<div key={index}>{detail.detail}</div>) 
                })}</p> */}
                <p>{item?.description?.map((detail,index)=>{
                 return(<div key={index}>{detail.detail}</div>) 
                })}</p>
                {item.code_example&& <div className='p-4 bg-black text-white rounded-md mt-3'> 
                      <pre>
                        <code>{item.code_example}</code>
                        </pre>                 
                  </div>}
              </div>
              )
              
          }):[1,2,3,4,5].map((item,index)=>
            <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]'></div>)}
        </div>
     </div>

  )
}

export default ChapterContent