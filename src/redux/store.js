import { configureStore } from "@reduxjs/toolkit"  ;
import userReducer from "./userSlice" ;
import educatorReducer from "./educatorSlice" ;
import courseReducer from "./allCourseSlice" ;
import enrollReducer from "./enrollCourseSlice" ;

 export  const Store = configureStore({
           reducer : {
                  user : userReducer   , 
                  educatorCourseData : educatorReducer ,
                  allCourses : courseReducer  ,
                  enrollCourseData : enrollReducer
           }
})


export default Store ;
