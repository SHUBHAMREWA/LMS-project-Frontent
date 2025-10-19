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
import { TfiMenu } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';


const Nav = () => {  

    const { userData }   = useSelector((state)=> state.user) ; 

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const [show , setShow]  = useState(false) ;
    const [showHemp , setShowHemp]  = useState(false) ;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(()=>{  
                  

    } , [])   


    const logoutFunction = async()=>{ 

      try{

            
         let response = await axios.get(`${baseUrl}`  + "/api/user/logout" , { withCredentials : true })  ; 

         console.log("logout function Response " ,response) ; 

          dispatch(setUser(null))   
           setShow(false)
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

  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (

    <nav className={`fixed z-10 top-0 w-full h-[70px] px-6 py-3 bg-[#54535355] flex 
     ${isScrolled ? "backdrop-blur-sm " : ""} transition-all 
     justify-between items-center`}>
      {/* Left side - Logo */}
      <div className=' lg:w-[20%]  w-[30%] flex items-center transition-all lg:pl-12 pl-2'>
        <img src={Logo} alt="Logo" width={60} height={60} className='border-2  border-white rounded-2xl' />
      
      </div>
      
      {/* Right side - Profile */}

      <div className='hidden relative lg:flex'>  

       
      { userData ?  

       <div className='lg:flex items-center gap-3 transition-all lg:pr-12 pr-2 hidden'>  

       {
          userData?.photoUrl ?<img 
                   onClick={()=> setShow((prev)=> !prev)}
                      src={userData.photoUrl} 
                      alt="Profile" 
                      className="w-17 h-17 p-3 rounded-full object-cover"
                    /> :   
                           <span 
               onClick={()=> setShow((prev)=> !prev)} className=' bg-gray-200 cursor-pointer text-2xl py-1 px-3 rounded border-2 border-white'> 
                   
                    { userData?.name ? userData.name[0].toUpperCase() :  <IoPersonSharp/>}
        </span>
       }
       


       { userData?.role == "educator" && <span 
       onClick={()=> navigate("/educator/dashboard")}
       className='bg-black text-white shadow  cursor-pointer  p-2  rounded-xl border-2 border-white'>
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
         
         { show &&  <div  
           className=' absolute flex bg-white flex-col gap-3 p-2 border-2 border-black
            text-white justify-center top-[130%] rounded-xl '
           > 
            <button  
            onClick= {()=> navigate("/profile")}
            className='bg-black hover:bg-[#54535355] transition-colors hover:text-black p-2 rounded-2xl '
             >
               My Profile
            </button> 

            <button 
           className='bg-black hover:bg-[#54535355] transition-colors hover:text-black p-2 rounded-2xl '
             >
              My Courses
            </button>
           </div>
}


      </div> 
 
     
      <TfiMenu 
          onClick={()=> setShowHemp((prev)=>!prev)}
       className='lg:hidden cursor-pointer text-white text-2xl'/>
    



    {/* Mobile View */}
      <div className={`lg:hidden z-10 fixed flex flex-col gap-4 items-center justify-center
       top-0 w-[100vw] h-[100vh] bg-[#000000d3] transition duration-600 transform left-0 ${!showHemp ? "translate-x-[-100%]"  : "translate-x-0"} `}> 

          <div className='absolute top-5 right-6 cursor-pointer text-3xl text-white font-extrabold' >
              <RxCross2
              onClick={()=> setShowHemp(false)}
              /> 
          </div>  
            
         <span 
               onClick={()=> setShow((prev)=> !prev)} className=' text-white cursor-pointer text-2xl py-1 px-3 rounded border-2 border-white'>
       { userData?.name ? userData.name[0].toUpperCase() :  <IoPersonSharp/>}
        </span>
           
         { userData && <div  
           className='  flex flex-col gap-3 p-2 
            text-white justify-center top-[130%] rounded-xl '
           > 
            <button  
              onClick= {()=> navigate("/profile")}
            className='bg-black  border-2 px-12 border-white hover:bg-[#54535355] transition-colors  py-6 rounded-2xl '
             >
               My Profile
            </button> 

            <button 
           className='bg-black border-2 px-12 border-white hover:bg-[#54535355] transition-colors py-6 rounded-2xl '
             >
              My Courses
            </button>
           </div>
           } 
 
         { userData?.role == "educator" && <span 
          onClick={()=> navigate("/educator/dashboard")}
          className='bg-black text-white  border-2 px-12 border-white hover:bg-[#54535355] transition-colors  py-6 rounded-2xl'>
           Dashboard
        </span>
         }

       { userData &&  <span 
        onClick={logoutFunction}
        className='bg-black text-white  border-2 px-12 border-white hover:bg-[#54535355] transition-colors  py-6 rounded-2xl'>
           LogOut
        </span>
}
         {!userData && <span 
        onClick = {()=>navigate("/login")}
         className='bg-black text-white  border-2 px-12 border-white hover:bg-[#54535355] transition-colors  py-6 rounded-2xl'>
           Login
        </span>    }
            
       </div>

    </nav>
  )
}

export default Nav;