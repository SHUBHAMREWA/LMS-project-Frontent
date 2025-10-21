import React from 'react'

import  image from "../../assets/empty.jpg"

const Dashboard = () => {



  return (
    <div className='w-full min-h-screen bg-[#f2f4f5]'>   


          <div className='w-full h-full  '> 


               {/* show educatro Details */}
                 <div className='flex flex-col lg:flex-row bg-white px-15 gap-3 lg:justify '>
                 
                  <div className=''>
                       <img src={image} alt="" className='h-25 w-25 rounded-full p-2 border-4 border-black' /> 
                  </div>
                  
 
                   <div className='flex flex-col gap-2'>                       
                       <p>hellow india</p>
                      <h1>kya bol riya</h1>

                   </div>

                 </div>
              
             


          </div>

    </div>
  )
}

export default Dashboard