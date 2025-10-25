
import axios from 'axios';
import { get } from 'mongoose';
import React, { useEffect } from 'react'
import { baseUrl } from '../App';

const  getThumnail = (id) => {  
        
      const courseId = id ;    
    
      let courseThumnail = null ; 
       
      useEffect(()=>{ 
                
        const getThumnail  = async()=>{  
             
               try {

                let thumbnail = await axios.get(baseUrl + `/api/course/getthumbnail/${courseId}` , {withCredentials : true})  
                 
                if(thumbnail.data.success){
                       courseThumnail = thumbnail.data.thumbnailData ; 
                }
                
               } catch (error) {
                
               }
             
        }

        getThumnail() ;
           

      }, [id])
     
  return (    
      
     <div>
        {courseThumnail}
     </div>
    
  )
}

export default getThumnail