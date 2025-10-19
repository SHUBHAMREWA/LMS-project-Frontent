import React from 'react'
import { getEducatorCourse } from '../../customHooks/getEducatorCourse'  ;
import { useSelector } from 'react-redux';


const Courses = () => {     
      
     getEducatorCourse() ; 
      
      const  {courseData}  = useSelector(state => state.courseData)  ;
     
      console.log(courseData) ;
     

  return (
    
    <div>  
          
       {
           courseData?.length > 0 &&  courseData.map(()=>{
             return   <h1>course le lo</h1>
           })
       }


    </div>


  )
}

export default Courses