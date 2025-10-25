
import { createSlice } from "@reduxjs/toolkit";  

// Renamed slice and state
const EducatorCouseSlice = createSlice({
             name : "EducatorCouseSlice" , 
             initialState : {
                  educatorCourseData : null
             }   , 
             reducers : {
                    
                  setEducatorCourseData : (state , action) => {     

                         state.educatorCourseData = action.payload ;
                  }                 
                  
             }
})


export const { setEducatorCourseData } = EducatorCouseSlice.actions  ;  
export default EducatorCouseSlice.reducer ;
