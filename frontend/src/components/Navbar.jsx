import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';



const Navbar = () => {
  
  const newCollections = async () => {
    
    
    const name = prompt("Enter chat name: ");
    if (!name || name.length === 0) {
      toast.error("Chat name cannot be empty!");
      return;
    }
    setCollectionName(name);
    const url = "http://localhost:4000/app/newCollection";
    try {
      const res = await axios.post(url, { collectionName: name }, {
        withCredentials: true,
      });
      if (res.data.status) {
        toast.success(res.data.message);
        getCollections();
        getCurrentCollection();
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getCurrentCollection = async () => {
    const url = "http://localhost:4000/app/setCurrentCollection";
    try {
      const res = await axios.post(url, {}, {
        withCredentials: true,
      });
      if (res.data.status) {
        setCurrentCollection(res.data.currentCollectionName );
        localStorage.setItem('currentChat', res.data.currentCollectionName );
        console.log(res.data.currentCollectionName );
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getCollections = async () => {
    try {
      const url = "http://localhost:4000/app/collections";
      const response = await axios.get(url, {
        withCredentials: true,
      });
      if (response.data.collections !== 'users') {
        setCollections(response.data.collections);
      }
    } catch (err) {
      console.error("Error fetching collections:", err.message);
    }
  };
  const model = localStorage.getItem('model');
  if(!model)
  {
    localStorage.setItem('model', 'lite');
  }
  const handleOptionChange = (event) => {
    setCurrentModel(event.target.value);
    localStorage.setItem('model', event.target.value);
  };
   
  return (
    <></>
  );
};

export default Navbar;