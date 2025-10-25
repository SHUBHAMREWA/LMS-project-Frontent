import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import { useSelector } from 'react-redux'
import getAllCourses from '../customHooks/getAllCourses'

const AllCourses = () => {  
  
    let allCourses = useSelector(state => state.allCourses) ; 

     getAllCourses() ;
     
  console.log(allCourses)


  return ( 

    <div>
      <Nav/>    



    </div>
  )
}

export default AllCourses