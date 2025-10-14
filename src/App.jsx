

import { Navigate, Route , Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { getCurrentUser } from "./customHooks/getCurrentUser.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice.js"
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";


 export const baseUrl  = "http://localhost:5001"

const App = ()=>{ 

     const dispatch = useDispatch() ;
     const { userData  }  = useSelector(state => state.user) 

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
            <Route  path="/signup" element={!userData ? <SignupPage/> : <Navigate to="/home" />} />
            <Route  path="/profile" element={userData ?<Profile/> : <Navigate to="/signup"/>} />
            <Route path="/forgot-password"  element={<ForgotPassword/>}/>
            <Route  path="/edit-profile" element={userData ?<EditProfile/> : <Navigate to="/signup"/>} />
            
            


          </Routes>
       </>
   )


}


export default App ;
