
import { createSlice } from "@reduxjs/toolkit"


const userSlice  = createSlice({
           name : "user" , 
           initialState : {
            userData : JSON.parse(localStorage.getItem("userData")) || null,
           } , 
           reducers : {
                   setUser : (state , action) =>{  
                         state.userData = action.payload;
                           if (action.payload) {
                                        localStorage.setItem("userData", JSON.stringify(action.payload));
                             } else {
                                        localStorage.removeItem("userData");
                           }
                   }
           }
})

export const {setUser}  = userSlice.actions ;
export  default userSlice.reducer ;