import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
const Body = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(()=>{
    const checkLogin=()=>{
      const url="http://localhost:4000/auth/verify"
      axios.get(url,{
        withCredentials:true
      }).then(res=>{
        console.log(res)
        if(res.data.status)
          {
            setisLoggedIn(true);
          }
          else{
            toast.error(res.data.message)
            navigate('/signin');
          }
      }).catch(err=>{
        console.log(err.message);
        navigate('/signin');
      })
    }
    checkLogin();
  },[])

  return (
    <div>
     
      <Navbar />
     
      <Footer />
    </div>
  )
}

export default Body
