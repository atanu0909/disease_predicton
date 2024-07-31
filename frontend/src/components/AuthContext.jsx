import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Create provider component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const url = "http://localhost:4000/auth/verify";
        const res = await axios.get(url, { withCredentials: true });
        if (res.data.status) {
          setIsLoggedIn(true);
        } else {
          toast.error(res.data.message);
          navigate('/signin');
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    checkLogin();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
