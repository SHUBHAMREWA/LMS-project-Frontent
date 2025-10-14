import React from 'react'

import { useSelector } from 'react-redux'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
       
      let {userData}  = useSelector(state => state.user)  ;
      let navigate = useNavigate()
   
       console.log( typeof userData.photoUrl) ;


  return (
    <div className='w-[100vw] h-[100vh] bg-[#f2f4f5] flex justify-center items-center shadow-2xl'>  

      <div 
      className='relative bg-white lg:w-[50%] h-[50] w-[70%] rounded-2xl flex justify-center items-center flex-col gap-5 p-3' >  

      <span 
      onClick={()=>navigate("/home")}
       className='active:bg-black active:text-white  p-1 rounded-full  absolute top-4 left-3 text-4xl' >
           <IoArrowBack/>
      </span>

     
         {userData.photoUrl ?<img 
                      src={userData.photoUrl} 
                      alt="Profile" 
                      className="w-20 h-20 p-3 rounded-full object-cover"
                    /> :   
            <span  
          className='text-2xl  py-3 px-6 bg-black text-white rounded-full'
          > {userData?.name.split("")[0].toUpperCase()}  </span>
}

           <span>{userData.role}</span>
     

      <div className='flex w-[100%] lg:text-xl text-[16px]  p-3 flex-col gap-5'>
            <span><b> Name  </b> : {userData?.name}</span> 
            <span><b> Bio   </b>  :   {userData?.discription == null ? "Bio not Added " : userData?.discription}</span>
            <span><b> Email </b>  : {userData?.email}</span> 
            <span><b> Phone </b>  : {userData?.phone == null ? "Phone Number not Added " : userData?.phone}</span>
      </div> 

      <button 
         onClick={()=>navigate("/edit-profile")}
       className='cursor-pointer bg-black px-4 py-3 text-sm lg:text-2xl active:bg-gray-800 lg:active:text-xl transition-all duration-75 text-white rounded-xl'>
        Edit Profile
      </button>
      
      </div>

       
    </div>
  )
}

export default Profile