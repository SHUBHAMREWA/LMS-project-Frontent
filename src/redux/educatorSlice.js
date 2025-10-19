
import { createSlice } from "@reduxjs/toolkit";  


const  courseSlice = createSlice({
             name : "createSlice" , 
             initialState : {
                  courseData : null
             }   , 
             reducers : {
                    
                  setCourseData : (state , action) => {     

                         state.courseData = action.payload ;
                  }                 
                  
             }
})


export const {setCourseData} = courseSlice.actions  ;  
export default courseSlice.reducer ;