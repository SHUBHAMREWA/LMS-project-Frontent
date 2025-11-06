 
 
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
import Dashboard from "./pages/Educator/Dashboard.jsx";
import Courses from "./pages/Educator/Courses.jsx";
import Createcourse from "./pages/Educator/Createcourse.jsx";
import Editcourse from "./pages/Educator/Editcourse.jsx";
import AddModuleLessons from "./pages/Educator/AddModuleLessons.jsx";
import AllCourses from "./pages/AllCourses.jsx";
import ShowCourse from "./pages/ShowCourse.jsx";
import StudentCourse from "./pages/student/StudentCourse.jsx";
import WatchCourse from "./pages/student/WatchCourse.jsx";
import About from "./component/About.jsx";
 
 
 export const baseUrl  = import.meta.env.VITE_API_URL || ""
 
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

            {/* educator routes*/}
            <Route path="/educator/dashboard" element={userData && userData.role === "educator" ? <Dashboard/> : <Navigate to="/home" />} />
            <Route path="/educator/courses" element={userData && userData.role === "educator" ? <Courses/> : <Navigate to="/home" />} />
            <Route path="/educator/create-course" element={userData && userData.role === "educator" ? <Createcourse/> : <Navigate to="/home" />} />
            <Route path="/educator/edit-course/:id" element={userData && userData.role === "educator" ? <Editcourse/> : <Navigate to="/home" />} />
            <Route path="/educator/add-modules-lessons" element={userData && userData.role === "educator" ? <AddModuleLessons/> : <Navigate to="/home" />} />


            {/* student routes */}
            <Route path="/mycourse" element={userData && userData.role === "student" ? <StudentCourse/> : <Navigate to="/home" />} />
            <Route path="/mycourse/:id" element={userData && userData.role === "student" ? <WatchCourse/> : <Navigate to="/home" />} />
            


            {/* Show All Courses */}
            <Route path="/allCourses" element={<AllCourses/>} />
            {/* Public course details */}
            <Route path="/course/:id" element={<ShowCourse/>} />





            


          </Routes>
       </>
   )


}


export default App ;
