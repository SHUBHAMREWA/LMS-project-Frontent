

import { Route , Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { getCurrentUser } from "./customHooks/getCurrentUser.js";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice.js"


 export const baseUrl  = "http://localhost:5001"

const App = ()=>{ 

     const dispatch = useDispatch() ;

    useEffect(()=>{
         
       const userInfo = async()=>{
           
          let user = await getCurrentUser() ;
          
          if(!user){
             dispatch(setUser(null)) ;
              return ;
          }
                dispatch(setUser(user)) ;          
       }

       userInfo() ;

    } , [])
   
   return (
       <>  
        <ToastContainer position="top-right" autoClose={3000} />
          <Routes>

            <Route  path="/home" element={<Homepage/>} />
            <Route  path="/" element={<Homepage/>} />
            <Route path="/login"  element={<LoginPage/>}/>
            <Route  path="/signup" element={<SignupPage/>} />


          </Routes>
       </>
   )


}


export default App ;
