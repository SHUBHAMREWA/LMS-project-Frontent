
import React from 'react'
import { useDispatch , useSelector } from 'react-redux'  ;


const Homepage = () => {  
        
       const dispatch = useDispatch() ;
       const user = useSelector((state)=>state.user) ;


  return (
    <div> 
       {JSON.stringify(user)}
    </div>
  )
}

export default Homepage