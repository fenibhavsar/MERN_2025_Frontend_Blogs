import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const auth = useContext(context)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await axios.post(`https://mern-2025-blogs.onrender.com/api/users/login`, {

        email,
        password
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });

      auth.setIsAuthenticated(true);

      setTimeout(() => {
        navigate('/profile')
      }, 1500);

    } catch (error) {
      // console.error(error)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
      auth.setIsAuthenticated(false);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-dark">
        <div className="card p-4 shadow-lg bg-secondary text-light w-100" style={{ maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  
  
}

export default Login 