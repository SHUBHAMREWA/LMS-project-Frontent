import { createSlice } from "@reduxjs/toolkit";


const enrollCourseSlice = createSlice({
      name : "enrollCourse" , 
      initialState : {
            enrollCourseData : null
      } ,
      reducers : {
            setEnrollCourseData : (state , action)=>{ 
                 state.enrollCourseData = action.payload ;  
            }
      }

})


export const {setEnrollCourseData}   = enrollCourseSlice.actions ; 
export default enrollCourseSlice.reducer ;