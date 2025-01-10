import React, { useEffect } from 'react'
import {Sidebar} from"../components/Profile/Sidebar";
import{Outlet} from"react-router-dom";
import axios from "axios";
export const Profile = () => {
  const headers={        
   userId:localStorage.getItem("userId"),
   authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get userId from localStorage
        const response = await axios.get(
          `http://localhost:5000/api/auth/getuserInfo/${userId}`, // Use backticks for string interpolation
          { headers }
        );
        console.log(response.data); // Log the data instead of the whole response
      } catch (error) {
        console.error("Error fetching user information:", error); // Log the error for debugging
      }
    };
    fetch();
  }, []);
  
  return (
    <div className='bg-black px-2 md:px-2 flex flex-col md:flex-row h-screen py-8 gap-4 text-white'>
      <div className='w-2/6'>
      <Sidebar/>
      </div>
      <div className="w-4/6">
      dddd
      <Outlet/>
      </div>
    </div>
  )
}

