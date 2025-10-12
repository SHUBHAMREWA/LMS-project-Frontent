

import React from 'react'
import { GiAbstract020 } from "react-icons/gi";
import { SiOpenaccess } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";

const LogoforHomePage = () => {
  return (
    <div>
        <div 
        className='w-[100%] min-h-[80px] flex-col lg:flex-row flex justify-center items-center bg-white lg:gap-6 gap-2'
        >

            <div className='bg-[#e5e7e9] rounded-xl px-2 py-2 shadow-md flex text-xl text-[#02a17e] 
            font-semibold gap-2 justify-center items-center'>
                <GiAbstract020 className="text-[#02a17e] text-2xl" />
               <span>20K + Online Courses</span>                  
            </div>

            <div className='bg-[#e5e7e9] rounded-xl px-2 py-2 shadow-md flex text-xl text-[#02a17e] 
            font-semibold gap-2 justify-center items-center'> 
                 <SiOpenaccess className="text-[#02a17e] text-2xl" />
                <span>Liftime Access</span>

            </div>
            <div className='bg-[#e5e7e9] rounded-xl px-2 py-2 shadow-md flex text-xl text-[#02a17e] 
            font-semibold gap-2 justify-center items-center'> 
                 <GiTakeMyMoney className="text-[#02a17e] text-2xl" />
                <span> Value For Money </span>

            </div>
            <div className='bg-[#e5e7e9] rounded-xl px-2 py-2 shadow-md flex text-xl text-[#02a17e] 
            font-semibold gap-2 justify-center items-center'> 
                  <BiSupport className="text-[#02a17e] text-2xl" />
                <span> Life Time Support </span>

            </div>
            <div className='bg-[#e5e7e9] rounded-xl px-2 py-2 shadow-md flex text-xl text-[#02a17e] 
            font-semibold gap-2 justify-center items-center'> 
                  <IoIosPeople className="text-[#02a17e] text-2xl" />
                <span>Community Support </span>

            </div>

        </div>

    </div>
  )
}

export default LogoforHomePage