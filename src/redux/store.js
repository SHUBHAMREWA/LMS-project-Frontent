import { configureStore } from "@reduxjs/toolkit"  ;
import userReducer from "./userSlice" ;
import courseReducer from "./educatorSlice"

 export  const Store = configureStore({
           reducer : {
                  user : userReducer   , 
                  courseData : courseReducer
           }
})


export default Store ;