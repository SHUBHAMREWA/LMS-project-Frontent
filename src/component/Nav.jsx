import React, { useEffect } from 'react'
import Logo from "/logo.jpg?url"
import { IoPersonSharp } from "react-icons/io5";   
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../App';
import { setUser } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Nav = () => {  

    const { userData }   = useSelector((state)=> state.user) ; 

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    useEffect(()=>{  
         
          

    } , [])   


    const logoutFunction = async()=>{ 

      try{

            
         let response = await axios.get(`${baseUrl}`  + "/api/user/logout" , { withCredentials : true })  ; 

         console.log("logout function Response " ,response) ; 

          dispatch(setUser(null))   

           toast.success("LogOut Successfully", {
                           position: "top-right",
                           autoClose: 2000,
                           theme: "light",
                           }); 

      }
      catch(error){  

        console.log("this is error from logout" ,error.response.data ) ;  

           toast.error("LogOut Error", {
                           position: "top-right",
                           autoClose: 2000,
                           theme: "light",
                           }); 
          
         
      }
      

    }




  return (
    <nav className='fixed z-10 top-0 w-full h-[70px] px-6 py-3 bg-[#54535355] flex justify-between items-center'>
      {/* Left side - Logo */}
      <div className=' lg:w-[20%]  w-[30%] flex items-center transition-all lg:pl-12 pl-2'>
        <img src={Logo} alt="Logo" width={50} height={50} className='border-2 border-white rounded-2xl' />
      
      </div>
      
      {/* Right side - Profile */}
      <div className='hidden lg:flex'>  

       
      { userData ?  

       <div className='lg:flex items-center gap-3 transition-all lg:pr-12 pr-2 hidden'>
              <span className=' hover:bg-gray-200 cursor-pointer text-2xl py-1 px-3 rounded border-2 border-white'>
       { userData?.name ? userData.name[0].toUpperCase() :  <IoPersonSharp/>}
        </span>


       { userData?.role == "educator" && <span className='bg-black text-white shadow  cursor-pointer  p-2  rounded-xl border-2 border-white'>
           Dashboard
        </span>
         }
        <span 
        onClick={logoutFunction}
        className='bg-white  shadow  cursor-pointer  p-2  rounded-xl border-2 border-white'>
           LogOut
        </span>   

        </div>
        
        :
        <span 
        onClick = {()=>navigate("/login")}
         className='bg-black shadow text-white  cursor-pointer  p-2  rounded-xl border-2 border-white'>
           Login
        </span>
        
}
      </div>  

    </nav>
  )
}

export default Nav;