import React from 'react'
import { GiArmoredBoomerang } from "react-icons/gi";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { FaUikit } from "react-icons/fa6";
import { TbBrandHackerrank } from "react-icons/tb";
import { PiOpenAiLogoBold } from "react-icons/pi";
import { PiDeviceMobileFill } from "react-icons/pi";
import { SiDatastax } from "react-icons/si";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { GiArtificialHive } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


const ExploreCourses = () => { 
     
  const navigate = useNavigate() ;
   
  return (
    <div 
    className='w-[100vw] lg:min-h-[50vh]  md:min-h-[50vh] flex lg:flex-row flex-col lg:gap-4 gap-9 justify-center py-0 px-0
     lg:py-10 lg:px-50
     items-center  ' >  


{/* left section */}
        <div 
        className=' lg:w-[50%] w-[75%] flex  flex-col lg:gap-7 gap-2  justify-center items-start p-3 lg:px-7 px-1 mt-5 lg:mt-0 '
        >  
              <h1 className=' lg:text-5xl text-3xl  font-bold'>Explore <br />  Our  Courses</h1> 
              <p className='lg:text-xl text-[16px]' >
 
Unlock your potential with our expertly designed courses that combine real-world skills, interactive learning, and hands-on projects. Whether you’re passionate about web development, design, or emerging technologies, our courses are crafted to help you learn at your own pace and achieve your goals faster.
              </p>

                <button 
                onClick={()=>navigate("/allCourses")}
                 className='font-semibold text-white bg-black  border-2  lg:text-xl
                        rounded-2xl border-black py-3 lg:px-4 px-1  cursor-pointer' >Explore Courses 
                         <GiArmoredBoomerang className='inline-block ml-2 text-xl text-white '/>
                </button>

        </div>


{/* right section */}
        <div className='lg:w-[50%] w-[60%] flex flex-wrap lg:gap-6 gap-5 text-[12px] lg:text-[16px] justify-center' >  


              <div className='flex justify-center items-center  flex-col text-center  '> 

                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-pink-500 rounded-2xl'>
                    <LiaLaptopCodeSolid/>
                </div>
                <span>Web Devlopment</span>
              </div>

              <div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-blue-500 rounded-2xl'>
                    <FaUikit/>
                </div>
                <span>UI/UX  designing</span>
              </div>
   
    <div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-green-500 rounded-2xl'>
                    <TbBrandHackerrank/>
                </div>
                <span>Ethical Hacking </span>
              </div>


<div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-orange-500 rounded-2xl'>
                    <PiOpenAiLogoBold/>
                </div>
                <span>AI/ML</span>
              </div>


<div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-emerald-700 rounded-2xl'>
                    <PiDeviceMobileFill/>
                </div>
                <span>App Dev</span>
              </div>  


              <div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-amber-400 rounded-2xl'>
                    <SiDatastax/>
                </div>
                <span>Data Science</span>
              </div>

              <div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-red-600 rounded-2xl'>
                    <TbBrandGoogleAnalytics/>
                </div>
                <span>Data Analytics</span>
              </div>

              <div className='flex justify-center items-center flex-col text-center '>
                <div className='py-5 px-4 text-[#3f3a3a]  text-2xl lg:text-5xl bg-fuchsia-700 rounded-2xl'>
                    <GiArtificialHive/>
                </div>
                <span>Ai Tools</span>
              </div>



        </div>
        
    </div>
  )
}

export default ExploreCourses