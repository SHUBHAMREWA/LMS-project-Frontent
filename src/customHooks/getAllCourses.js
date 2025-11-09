
import { useEffect } from 'react';
import axios from "axios"; 
import { baseUrl } from '../App'; 
import { setAllCourses } from '../redux/allCourseSlice'; 
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';

// getAllCourses.js
const useGetAllCourses = () => {   

   const dispatch = useDispatch();
   const { allCourses } = useSelector((state) => state.allCourses);

   useEffect(() => {  
       // Agar courses already loaded hain toh API call na karo
       if (allCourses && allCourses.length > 0) {
           console.log("Courses already loaded, skipping API call");
           return;
       }

       console.log("API call hua ▒▒▒▒╡☺▒▒▒");

       const getCourse = async () => { 
           try {
               let course = await axios.get(baseUrl + `/api/course/getAllcourse`, { 
                   withCredentials: true 
               });
                 
               if (course.data.success) {
                   dispatch(setAllCourses(course.data.courseData));
               }

           } catch (error) {
               console.error("Error fetching courses:", error);
               dispatch(setAllCourses([]));                
           }
       };

       getCourse();

   }, [dispatch]); // allCourses ko dependency me add karo
}
export default useGetAllCourses;