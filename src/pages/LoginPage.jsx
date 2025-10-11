
import React, { use } from 'react'
import Logo from "/logo.jpg"
import GoogeLogo from "../assets/google.jpg"
import { Link } from 'react-router-dom'
import { baseUrl } from '../App'
import axios from "axios";
import { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../redux/userSlice' ;
import { useDispatch } from 'react-redux' ; 
import { getCurrentUser } from '../customHooks/getCurrentUser'
    





const LoginPage = () => {  
     
     const navigate = useNavigate() ;
     const dispatch  = useDispatch() ;
       
     const [email ,setEmail] = useState("") ; 
     const [password ,setPassword] = useState("") ;  
     const [loading, setLoading] = useState(false) ;


     const LoginFunction = async()=>{ 

        try{ 
             setLoading(true)
             let response = await axios.post(baseUrl + "/api/user/login" ,   
              {    email ,  password } ,
              {withCredentials : true}
             )
             

              setLoading(false)  
              toast.success("Login Successfully", {
                position: "bottom-left",
                autoClose: 2000,
                theme: "dark",
                });  

                let getUser = await getCurrentUser()
                
                 dispatch(setUser(getUser))

             navigate("/home")

        }
        catch(error){
              setLoading(false)
              toast.error(error.response.data.message, {
                position: "bottom-left",
                autoClose: 2000,
                theme: "dark",
                });
              console.log("this is error from login" ,error.response.data)

        }
         

     }
     

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-[#dddadb]'>
  
  {/* ----- Form ----- */}
          <form 
          onSubmit={(e)=>e.preventDefault()}
           className='bg-white w-[80%] md:w-[70%] h-150  flex justify-center items-center shadow-x rounded-2xl' > 

            {/* ▒▒▒▒▒▒▒ Left side ▒▒▒▒▒ */}
            <div className='p-2 w-[80%] md:w-[50%] flex justify-center items-center flex-col gap-3 '>

                          <div className='flex flex-col justify-center items-center gap-2'> 
                              <h1 className='text-3xl font-bold'>Welcome Back</h1>
                              <h2 className='text-xl text-gray-500'>Login to your account</h2>
                            </div>  


                            <div className='w-[100%] md:w-[80%]  flex flex-col justify-center items-start '>
                                <label className='font-semibold' htmlFor='email'>Email</label>
                                <input 
                                 onChange={(e)=>setEmail(e.target.value)}
                                 value={email}
                                id='email' type='text' 
                                 placeholder='Enter your Email' 
                                 className='w-[100%]  outline-none shadow
                                  border border-s-0 border-e-0 bg-gray-50 border-gray-400  p-2'
                                  />
                            </div>


                            <div className='w-[100%] md:w-[80%]  flex flex-col justify-center items-start '>
                                <label className='font-semibold' htmlFor='password'>Password</label>
                                <input
                                 onChange={(e)=>setPassword(e.target.value)}
                                 value={password}
                               id='password' type='text' 
                                 placeholder='Enter your Password' 
                                 className='w-[100%]  outline-none shadow
                                  border border-s-0 border-e-0 bg-gray-50 border-gray-400  p-2'
                                  />
                            </div>
                            



                    

                            <button  
                            onClick={LoginFunction}
                            disabled={loading}
                            className=' w-[100%] md:w-[80%] bg-black hover:cursor-pointer text-white rounded py-3 '> 
                                { loading ? <ClipLoader size={22} color="#ffffff" /> : "Login"}
                           </button>
                            <button 
                            onClick= {()=>navigate("/forgot-password")}
                             className=' w-[100%] md:w-[80%] hover:cursor-pointer bg-gray-50  text-gray-700 rounded'> Forgot Password</button>

                            <div className='w-[100%] md:w-[80%]  flex  justify-around items-center '>
                                 <div className='w-[30%] h-0.5 bg-gray-300'></div>
                                 <div>OR Continue</div>
                                 <div className='w-[30%] h-0.5 bg-gray-300'></div>
                            </div>  

                       <button className=' w-[100%] md:w-[80%] border-2 border-y-gray-300 border-x-gray-400 hover:cursor-pointer flex 
                       justify-center items-centertext-white rounded py-3 '> 
                            <img src={GoogeLogo} width={30} alt="GoolgeImg" /> <span>oogle</span>
                         </button>

                         <div className='w-[100%] md:w-[80%] flex justify-center items-center'>
                              <span className='text-gray-500'>have No Account ?</span > 
                             { loading ? <ScaleLoader size={22} color="#000000" /> : <Link  className='text-black font-semibold underline'
                              to={'/signup'}> SignUp or Create</Link>}
                         </div>

            </div>


            {/* ▒▒▒▒▒▒▒ Right side ▒▒▒▒▒ */}
            <div className='rounded-r-2xl md:w-[50%] hidden md:flex felx-1 flex-col h-[100%] bg-black justify-center items-center' >

                <img src={Logo}  alt='LOGO' width={80} height={100}  
                className=''/>      
                <span className='text-3xl text-white'>VIRTUAL CLASSSES</span>  
         
            </div>


          </form>

    </div>

  )
}

export default LoginPage