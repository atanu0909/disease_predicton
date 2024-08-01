import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
const Body = () => {
  const [prompt, setprompt] = useState("")
  const [response, setresponse] = useState("")
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
  
   
    const convertToArray = (str) => {
      // Remove the surrounding quotes and extra spaces
      const cleanedStr = str
        .replace(/^\s*"|"\s*$/g, '') // Remove surrounding quotes
        .replace(/"\s*,\s*"/g, ","); // Fix quotes around commas
    
      // Split the string into an array of strings
      return cleanedStr.split(/,\s*/);
    };
  
    // Use the function to convert the input

    

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    let input = convertToArray(prompt);
    console.log( convertToArray(prompt))
    let url = "http://localhost:4000/app/pred"
    axios.post(url, {prompt:input}).then((res)=>{
      console.log(res.data.response.prediction);
       setresponse(res.data.response.prediction)
      console.log(input)
    }).catch((err)=>{
      toast.error(err.message)
    })
  }

 
  return (
    <div>
     
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="bg-blue-600 text-white w-full py-4 text-center">
        <h1 className="text-3xl font-bold">Disease Prediction System</h1>
      </header>
      <main className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Disease Prediction System</h2>
        <p className="text-center text-gray-700 mb-6 max-w-xl">
          Enter your symptoms below to get a prediction of possible diseases. Our system uses a machine learning model to analyze the symptoms and provide you with the most likely diagnoses.
        </p>
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symptom">
                Symptoms
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="symptom"
                type="text"
                placeholder="Enter symptoms"
                onChange={(e) => setprompt(e.target.value)}
                value={prompt}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Predict
              </button>
            </div>
          </form>
              <div className={`w-full flex flex-col disease`}>
                  <span className='font-bold'>You might have:</span> {response}
              </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white w-full py-4 text-center mt-auto">
        <p>&copy; 2024 Disease Prediction System. All rights reserved.</p>
      </footer>
    </div>

    </div>
  )
}

export default Body
