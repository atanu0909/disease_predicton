import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginPrompt from './components/LoginPrompt';
import Home from './components/Home.jsx'
import Signin from './components/SIgnin.jsx';
import Signup from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import NotFound from './components/NotFound.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>
        <Route path="/*" element={<NotFound/>}/>
        {/* Add more routes as needed */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    
  );
}

export default App;
