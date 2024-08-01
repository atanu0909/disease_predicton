import React from 'react';

import Navbar from './Navbar';
const NotFound = () => {
  return (
    <>
        <Navbar className=""/>
        <div className="flex justify-center items-center d-block mx-auto w-11/12 ">
      <img
        className="mb-[5rem]"
       
        alt="404 “This is not the web page you are looking for”"
      />
    </div>
    </>
    
  );
};

export default NotFound;
