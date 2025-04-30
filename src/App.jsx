import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBlog from './pages/AddBlog';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import context from './context/AuthContext';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const auth = useContext(context);
  const [loading, setLoading] = useState(true); // for initial auth check

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`https://mern-2025-blogs.onrender.com/api/users/myprofile`, {
          withCredentials: true,
        });
  
        if (res.data && res.data.user) {
          auth.setUser(res.data.user);
          auth.setIsAuthenticated(true);
        } else {
          throw new Error('No user');
        }
      } catch (err) {
        auth.setUser(null);
        auth.setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  
if (loading) return null;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addblog' element={<AddBlog />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
