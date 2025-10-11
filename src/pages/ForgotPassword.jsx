import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import axios from "axios" ;
import { toast } from 'react-toastify';
import { baseUrl } from '../App';
import PuffLoader from "react-spinners/PuffLoader" ;



const ForgotPassword = () => {

       const [step , setStep]  = useState(1) 
       const [email , setEmail] = useState("") ;
       const [otp , setOtp]  = useState("") ;
       const [newPassword , setNewPassword] = useState("") ;
       const [confirmPassword , setConfirmPassword] = useState("") ;   
       const [loading , setLoading] = useState(false); 

      const navigate = useNavigate() ;


    //   step -1   
        const sendOtp = async()=>{     
             
            if(!validator.isEmail(email)){
                return toast.error("Please Enter Valid mail formate" , {
                    duration: 3000,
                    position: 'top-center',
                    style: { background: 'red', color: 'white' },
                })
            }     

            setLoading(true);
            
            try{  

                 let res = await axios.post(`${baseUrl}/api/user/sent-otp` , {email}) ;  

                 if(res.data.success){  
                    toast.success(res.data.message) ;
                    setStep(2) ; 
                    setLoading(false) ;
                 }
                 else{
                    setLoading(false) ;
                    toast.error(res.data.message) ;
                 }


            }
            catch(error){
                setLoading(false) ;
                console.log(error) ;
                toast.error("Send Otp Error", {
            duration: 3000,
            position: 'top-center',
            style: { background: 'red', color: 'white' },
        }) ;
            }
            
               
        } 

//     step -2        
 const verifyOtp = async()=>{

    setLoading(true) ;

    try{   
          let res = await axios.post(`${baseUrl}/api/user/verify-otp` , {email , otp})  ; 

          if(res.data.success){
            toast.success(res.data.message)    

          }
          else{
            toast.error(res.data.message) ;
          }
            setLoading(false) ;
          setStep(3)  ;
       }
    catch(error){
        setLoading(false) ;
        console.log(error) ;
         toast.error("Verify Otp Error", {
            duration: 3000,
            position: 'top-center',
            style: { background: 'red', color: 'white' },
        }) ;
    }
     
 }

//  step -3 
const setPassword = async()=> {

     if(newPassword !== confirmPassword){
        return toast.error("New Password and Confirm Password must be same" , {
            duration: 3000, 
            position: 'top-center',
            style: { background: 'red', color: 'white' },
        })
        }

        setLoading(true) ;
  
       try{

         let res = await axios.post(`${baseUrl}/api/user/forgot-password` , {email ,  newPassword})  ;
            if(res.data.success){   
                toast.success(res.data.message) ;
                navigate("/login") ;
            }
            else{
                toast.error(res.data.message) ;
            }
            setLoading(false) ;

       }
       catch(error){
        setLoading(false) ;
        console.log(error) ;
        toast.error("Set password Error", {
            duration: 3000,
            position: 'top-center',
            style: { background: 'red', color: 'white' },
        }) ;
       }
}

  return (
     <div className='w-[100vw] relative h-[100vh] flex-col flex justify-center items-center  bg-[#dddadb] overflow-x-hidden ' >
      {/* ▒ Send Email Step 1 ▒ */} 
     
    
         <form 
           onSubmit={(e)=>e.preventDefault()}
          className={`transform absolute  ${step === 1 ? 'translate-x-0' : 'translate-x-[-300%]'} md:w-[50%] w-[80%] transition-all duration-1000 flex gap-4 flex-col items-center bg-white py-11 px-8 rounded-2xl shadow`} >  
             <h1 className='md:text-3xl text-xl  font-bold'>Forgot Your Password</h1>
            <div className='w-[90%]'>
             <label htmlFor='email'>Email</label> <br /> 
             <input 
             value={email}
             onChange={(e)=>setEmail(e.target.value)} 
             className=' text-black w-[100%] rounded-xl border border-gray-400 outline-none focus:border-2 focus:border-black px-2 py-3 '
              id="email" type="email"  required
              placeholder='your@gmail.com'/>
           </div>

            <button 
            disabled={loading}
            onClick={sendOtp}
            className='bg-black flex justify-center text-white w-[90%] py-3 rounded-xl cursor-pointer  '>
                { loading ? <PuffLoader size={30} color='white'/>  : "Send OTP"}
            </button>
            <button  
             disabled={loading}
            onClick= {()=>navigate("/login")}
            className='bg-gray-200 text-black w-[90%] py-3 rounded-xl cursor-pointer  '>
                Back to Login
            </button>

         </form> 
         

         {/*▒ Verify Opt Step  2 ▒ */}

      
         <form 
         onSubmit={(e)=>e.preventDefault()}
          className={`transform absolute  ${step === 2 ? 'translate-x-0' : 'translate-x-[-300%]'} md:w-[50%] w-[80%] transition-all duration-1000 flex gap-4 flex-col items-center bg-white py-11 px-8 rounded-2xl shadow`}  >  
             <h1 className='md:text-3xl text-xl  font-bold'>Verify Your OTP</h1>
            <div className='w-[90%]'>
             <label htmlFor='otp'>  OTP</label> <br /> 
             <input 
             value={otp}
             onChange={(e)=>setOtp(e.target.value)}
             className=' text-black w-[100%] rounded-xl border border-gray-400 outline-none focus:border-2 focus:border-black px-2 py-3 '
              id="otp" 
              placeholder='* * * *'/>
           </div>

            <button  
            disabled={loading}

            onClick={verifyOtp} className='bg-black flex justify-center text-white w-[90%] py-3 rounded-xl cursor-pointer  '>
               { loading ? <PuffLoader size={30} color='white'/>  : "Verify OTP" }
            </button>
            <button 
            disabled={loading}
            onClick= {()=>navigate("/login")}
            className='bg-gray-200 text-black w-[90%] py-3 rounded-xl cursor-pointer  '>
                Back to Login
            </button>

         </form> 
         

         {/* ▒ Set Password Step 3 ▒*/}
        
         <form 
         onSubmit={(e)=>e.preventDefault()}
          className={`transform  absolute ${step === 3 ? 'translate-x-0' : 'translate-x-[-300%]'} md:w-[50%] w-[80%] transition-all duration-1000 flex gap-4 flex-col items-center bg-white py-11 px-8 rounded-2xl shadow`}  >  
             <h1 className='md:text-3xl text-xl  font-bold'>Set Your Password</h1>
            <div className='w-[90%]'>
             <label htmlFor='new'>New Password</label> <br /> 
             <input 
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
             className=' text-black w-[100%] rounded-xl border border-gray-400 outline-none focus:border-2 focus:border-black px-2 py-3 '
              id="new"  required
              placeholder='* * * * * * *'/>
           </div>
            <div className='w-[90%]'>
             <label htmlFor='confirm'>Cofirm Password</label> <br /> 
             <input  
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
             className=' text-black w-[100%] rounded-xl border border-gray-400 outline-none focus:border-2 focus:border-black px-2 py-3 '
              id="confirm"   required
              placeholder='* * * * * * *'/>
           </div>

            <button 
            disabled={loading}             
               onClick={setPassword}
              className='bg-black flex justify-center text-white w-[90%] py-3 rounded-xl cursor-pointer  '>
                  {loading ? <PuffLoader size={30} color='white'/>  : "Set Password"}
            </button>

            <button 
            disabled={loading}
            onClick= {()=>navigate("/login")}
            className='bg-gray-200 text-black w-[90%] flex justify-center py-3 rounded-xl cursor-pointer  '>
               {loading ? <PuffLoader size={30} color='white'/>  : "Back to Login"}
            </button>

         </form> 
         


     </div>
  )
}

export default ForgotPassword