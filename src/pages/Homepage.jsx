
import React from 'react'
import { useDispatch , useSelector } from 'react-redux'  ;
import Nav from '../component/Nav';


const Homepage = () => {  
        
       const dispatch = useDispatch() ;
       const user = useSelector((state)=>state.user) ;


  return (
         <div className='w-[100%] overflow-hidden'>
        <div className=' w-[100%] relative  lg:h-[140vh] h-[70vh] transition-all duration-500 ' >
           <Nav/>
        </div>
        </div>
   
  )
}

export default Homepage