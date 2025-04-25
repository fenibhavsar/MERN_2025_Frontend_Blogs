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

  return (
    <div className='text-center my-3'>
      <h1><BiSolidUserCircle /> {" "}{auth.user.name}</h1>
      <h1><MdEmail />{" "}{auth.user.email}</h1>
      <MyBlogs />
    </div>
  )
}

export default Profile 