
import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'  ;
import Nav from '../component/Nav'; 
import HomeImg from "../assets/home1.jpg"
import ai from "../assets/ai.png" 
import ai1 from "../assets/SearchAi.png" 
import { GiArmoredBoomerang } from "react-icons/gi";
import LogoforHomePage from '../component/LogoforHomePage';
import ExploreCourses from '../component/ExploreCourses';
import ShowCard from '../component/ShowCard';
import useGetAllCourses from '../customHooks/getAllCourses';


const Homepage = () => {  
        
       const dispatch = useDispatch() ;
       const user = useSelector((state)=>state.user) ; 

      
    
      useGetAllCourses() ;


  return (
         <div className='w-[100%] overflow-x-hidden'>
        <div className=' w-[100%] relative  lg:h-[150vh] h-[70vh] transition-all duration-500 ' >
              <Nav/>
            
            <img  className='object-cover  transition-all duration-500 w-[100%] lg:h-[100%] md:object-fill h-[50vh] '
             src={HomeImg} />

             <span 
              className='text-white font-bold absolute top-[15%] lg:top-[10%]  w-[100%] text-center text-[18px] lg:text-5xl'
             >Grow Your Skill With Top Quality Education</span>
             <span 
              className='text-white font-bold absolute top-[20%] lg:top-[15%] w-[100%] text-center text-xl lg:text-5xl'
             >Your Career Partner</span>
            

              <div className='text-white absolute lg:top-[25%]   top-[72%] w-[100%] flex justify-center items-center lg:flex-row flex-col
               gap-2 lg:gap-5'>  
                 <button className='font-semibold text-black lg:border-white border-2  lg:text-xl
                 rounded-2xl border-black py-3 lg:px-4 px-1 lg:text-white  cursor-pointer' >View All Courses 
                   <GiArmoredBoomerang className='inline-block ml-2 text-xl '/>
                 </button>
                 <button 
                 className='font-semibold lg:border-white border-2 lg:text-xl cursor-pointer 
                 rounded-2xl border-black py-3 lg:px-4 p-1 bg-black lg:bg-white lg:text-black  flex gap-2 text-white'
                 >Search With Ai 
                 <img src={ai} width={26} height={26} alt="" className='lg:flex hidden' />
                 <img src={ai1} width={25} height={25} alt="" className='flex lg:hidden' />
                 </button>

              </div>

                 </div> 

        <LogoforHomePage/>

        <ExploreCourses/>
  
        <ShowCard/>
        

        </div>
   
  )
}

export default Homepage