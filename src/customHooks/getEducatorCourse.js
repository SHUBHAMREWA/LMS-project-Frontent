import axios from "axios"
import { baseUrl } from "../App"
import { setEducatorCourseData } from "../redux/educatorSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"



export const getEducatorCourse = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);


    return (

        useEffect(() => {

            const getcourses = async () => {

                try {

                    let courseData = await axios.get(baseUrl + "/api/course/creater-course", { withCredentials: true });

                    dispatch(setEducatorCourseData(courseData.data.courseData))


                } catch (error) {     

                    dispatch(setEducatorCourseData(null))  ;
                    console.log("error in getEducatorCourse custrom hook", error.message) ;
                } 


            }

            getcourses();


        }, [userData])
    )


}

