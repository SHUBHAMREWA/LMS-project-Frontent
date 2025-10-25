
import React, { useEffect } from 'react' ;
import axios from "axios" ; 
import { baseUrl } from '../App'; 
import { setAllCourses  } from '../redux/allCourseSlice'; 
import { useDispatch } from 'react-redux'; 


const getAllCourses = () => {   

   const dispatch  = useDispatch() ;

  return (
     useEffect(()=>{  
         
          const getCourse = async()=>{ 


            try {
              
                let course = await axios.get( baseUrl + `/api/course/getAllcourse`   , {withCredentials : true} )  ;
                 
                console.log("all Course Fetch" ,  course.data.success)

                if(course.data.data.success){
                  console.log("heeey")
                      dispatch(setAllCourses(course.data.data.courseData))
                }

            } catch (error) {
                  dispatch(setAllCourses([]))                
            }
                 

          }

          getCourse() ;

     } , [])
  )
}

export default getAllCourses