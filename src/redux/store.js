import { configureStore } from "@reduxjs/toolkit"  ;
import userReducer from "./userSlice" ;
import educatorReducer from "./educatorSlice" ;
import courseReducer from "./allCourseSlice"

 export  const Store = configureStore({
           reducer : {
                  user : userReducer   , 
                  educatorCourseData : educatorReducer ,
                  allCourses : courseReducer
           }
})


export default Store ;
