import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AuthContext';
import axios from 'axios';
import MyBlogs from '../components/MyBlogs';
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const auth = useContext(context)

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/users/myprofile`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      auth.setUser(api.data.user)
      auth.setIsAuthenticated(true)
    }
    fetchUser();
  }, [])

  if (!auth.user) {
    return <div className="text-center my-5 text-muted">Loading profile...</div>;
  }
  
  return (
    <div className='text-center my-3'>
      <h4><BiSolidUserCircle /> {" "}{auth.user.name}</h4>
      <h4><MdEmail />{" "}{auth.user.email}</h4>
      <MyBlogs />
    </div>
  );
  

  return (
    <div className='text-center my-3'>
      <h4><BiSolidUserCircle /> {" "}{auth.user.name}</h4>
      <h4><MdEmail />{" "}{auth.user.email}</h4>
      <MyBlogs />
    </div>
  )
}

export default Profile 