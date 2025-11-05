

import { useDispatch, useSelector } from "react-redux"
import { setEnrollCourseData } from "../redux/enrollCourseSlice"  
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../App";


const getEnrollCourses = () => {

    const dispatch = useDispatch() ;
    const {enrollCourseData} = useSelector(state => state.enrollCourseData) ;

  return (
     
     useEffect(()=>{ 
          
          const fetchEnrollCourse  = async()=>{ 
                
              try { 
                  let enrollcourse = await axios.get(`${baseUrl}/api/course/getenrollcourses` , {
                      withCredentials : true
                  })

                  console.log("this is response from server enrollCourse" , enrollcourse)

                  if(enrollcourse.data.success){
                      dispatch(setEnrollCourseData(enrollcourse.data.enrollCoursesData))
                  }
                
              } catch (error) { 
                  
                 dispatch(setEnrollCourseData(null))
                
              }
             
          }

          fetchEnrollCourse() ;

     } , [])
    
  )
}

export default getEnrollCourses