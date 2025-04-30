import React, { useContext, useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {

  const [blog, setBlog] = useState([]);
  const auth = useContext(context);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/blogs/myblogs`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      setBlog(api.data.blogs)

    }
    fetchBlog();
  }, [])
  
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
  
    try {
      const api = await axios.delete(`https://mern-2025-blogs.onrender.com/api/blogs/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
      setBlog(prev => prev.filter(blog => blog._id !== id)); // remove from UI
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };
  
  const editBlog = async (id) => {
    auth.setId(id);
    navigate('/addblog')
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
      <div className='container text-center my-5' style={{ width: '50%' }}>
        {blog.map((data) => (
          <div
            key={data._id}
            className="card mb-3 bg-secondary text-light my-5 p-3"
            style={{ maxWidth: '760px' }}
          >
            {/* Row 1: Title */}
            <div className="row mb-3">
              <div className="col-12">
                <h3 className="card-title">{data.title}</h3>
              </div>
            </div>

            {/* Row 2: Image and Description */}
            <div className="row mb-3">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <img src={data.imgUrl} className="img-fluid rounded" alt="Blog" style={{ maxHeight: '200px' }} />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <p className="card-text">{data.description}</p>
              </div>
            </div>

            {/* Row 3: CreatedAt + UserDetail (left), Buttons (right) */}
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <div className='me-3 mt-2'> <UserDetail id={data.user} /> </div>
                <small className="me-3">{new Date(data.createdAt).toLocaleString()}</small>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <button onClick={() => editBlog(data._id)} className="btn btn-warning mx-2">
                  Edit
                </button>
                <button onClick={() => deleteBlog(data._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>

        ))}
      </div>
    </>
  )

}

export default MyBlogs 