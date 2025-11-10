import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validator from "validator";
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../App';
import { getCurrentUser } from '../customHooks/getCurrentUser';
import { setUser } from '../redux/userSlice';
import PropagateLoader from "react-spinners/PropagateLoader";





const EditProfile = () => {     
       
    let dispatch = useDispatch() ;
       

    let {userData}  = useSelector(state => state.user)  ;
          let navigate = useNavigate()

      const [name , setName]  = useState(userData.name || "") ;
      const [discription , setDiscription]  = useState(userData.discription || "") ; 
      const [phone , setPhone]  = useState(userData.phone || "") ; 
      const [photoUrl , setPhotoUrl]  = useState(userData.photoUrl || "") ; 
      const [showPhoto ,setShowPhoto]  = useState(userData.photoUrl || "") ;
      const [loading ,setLoading]  = useState(false) ;

      



      const editData = ()=>{  

        // console.log(discription.length)

        if(name.length > "35" || name.length < "3"){
            
            toast.error("Name is Too long", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                }); 

                return  false;

        }
          
        if (phone.length > "140") {

            toast.error("Invalid Phone Number", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                }); 

                return false ;

        }    
        if(discription.length > "150"){
              toast.error("Discription is to Long", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                }); 

                return false ;
        }



        return true ;


      }


      const requestToUpload = async()=>{    
            
        let isDataCorrect  = editData() ; 
              setLoading(true) ;

        let formData = new FormData() ; 

         formData.append("name" , name) ;
         formData.append("discription" , discription) ;
         formData.append("phone" , phone) ;
         formData.append("photoUrl" , photoUrl) ;

        if(!isDataCorrect){
            return setLoading(false) ;
        }
            
            try { 
                  const response = await axios.post(
                                            baseUrl + "/api/user/profile-update",
                                            formData,
                                            {
                                                withCredentials: true,
                                                headers: {
                                                "Content-Type": "multipart/form-data",
                                                },
                                            }
                                            );  

                       let user = await getCurrentUser() ; 

                      dispatch(setUser(user))
                                            
                       toast.success("Data Update Successfully", {
                                position: "top-right",
                                autoClose: 2000,
                                theme: "light",
                                });   
                                
                                setLoading(false)
                                navigate("/home")
                
            } catch (error) { 
                setLoading(false) ;
                       toast.error("Data Update Error", {
                                position: "top-right",
                                autoClose: 2000,
                                theme: "light",
                                }); 
                
                console.log("data update ERROR " , error)

             }    
            

            }
      
  
 
   return (
     <div className='min-h-screen w-full bg-[#f2f4f5] flex items-start justify-center pt-24 pb-16'>  
       <div className='relative w-[92%] lg:w-[70%] max-w-5xl bg-white rounded-3xl shadow-2xl p-6 lg:p-10 flex flex-col items-center gap-5'>  
        <span className='text-xl font-bold'>Edit Profile</span>
 
       <button 
       onClick={()=>navigate('/profile')}
        className='absolute top-4 left-4 text-3xl lg:text-4xl p-1 rounded-full hover:bg-black hover:text-white transition-colors' aria-label='Back'>
            <IoArrowBack/>
       </button>
 
      
          {showPhoto? (
            <img src={showPhoto} alt='Profile' className='w-20 h-20 rounded-full object-cover border border-gray-200' />
          ) :  (
          <span className='text-2xl py-3 px-6 bg-black text-white rounded-full'>
            {userData?.name?.[0]?.toUpperCase()}
          </span>
         )}
 
       <div className='flex w-full p-3 flex-col gap-4 items-center'>   
               <div className='w-full lg:w-[90%] flex flex-col gap-2'>  
                 <label htmlFor="photoUrl">Select Avatar</label>
                  <input 
                  type="file"
                  id='photoUrl'
                  name='photoUrl'  
                  onChange={(e)=>{
                     setPhotoUrl(e.target.files[0])
                     setShowPhoto(URL.createObjectURL(e.target.files[0]))
                  }}
               className='cursor-pointer p-2 text-[16px] bg-gray-300 rounded-xl border border-gray-300'  />
               </div>
          
               <div className='w-full lg:w-[90%] flex flex-col gap-1'>  
                 <label htmlFor="name">Name</label>
                  <input 
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  id='name'
                  name='name'  
                  className='p-2 text-[19px] rounded-2xl border border-gray-300'  type='text' />
               </div>

               <div className='w-full lg:w-[90%] flex flex-col gap-1'>  
                 <label htmlFor="phone">Phone</label>
                  <input  
                  onChange={(e)=>setPhone(e.target.value)}
                  id='phone'
                  name='phone'  
                  value={phone}
                  className='p-2 text-[19px] rounded-2xl border border-gray-300'  type='tel' />
               </div>

               <div className='w-full lg:w-[90%] flex flex-col gap-1'>  
                 <label htmlFor="email">Email</label>
                  <input  
                  readOnly
                  id='email'
                  name='email'  
                  value={userData?.email}
                  className='p-2 text-[19px] bg-gray-200 rounded-2xl border border-gray-300'  type='email' />
               </div>

               <div className='w-full lg:w-[90%] flex flex-col gap-1'>  
                 <label htmlFor="bio">Bio</label>
                  <textarea
                    onChange={(e)=>setDiscription(e.target.value)}
                    rows={3}
                    id='bio'
                    name='bio'  
                    value={discription}
                    className='p-2 text-[19px] rounded-2xl border resize-none border-gray-300'
                  />
               </div>
       </div> 
 
       <button  
           disabled={loading}
           onClick={requestToUpload}
           className='mt-2 bg-black text-white px-6 py-3 text-base lg:text-2xl rounded-xl hover:bg-gray-800 transition-colors'>
       {loading ? (
         <div className='flex justify-center items-center w-[120px]'>
           <PropagateLoader size={22} color='#ffffff' />
         </div>
       ) : 'Save Changes'}
       </button>
       
       </div>
     </div>
   )
}

export default EditProfile