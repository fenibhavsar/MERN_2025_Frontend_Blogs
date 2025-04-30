import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {

  const auth = useContext(context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imgUrl, setImgUrl] = useState("")


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("Fetching blog for ID:", auth.id);
        const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/blogs/blog/${auth.id}`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        setTitle(api.data.blog.title);
        setDescription(api.data.blog.description);
        setImgUrl(api.data.blog.imgUrl);
      } catch (error) {
        console.error("Fetch blog failed:", error.response?.data || error.message);
      }
    };

    if (auth.id) {
      fetchBlog();
    }
  }, [auth.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.id) {
      try {
        const api = await axios.post(`https://mern-2025-blogs.onrender.com/api/blogs/new`, {
          title,
          description,
          imgUrl
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
    } else {
      try {
        const api = await axios.put(`https://mern-2025-blogs.onrender.com/api/blogs/${auth.id}`, {
          title,
          description,
          imgUrl
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

        auth.setId("");
      } catch (error) {
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
      // transition={Bounce}
      />
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

      <div className="container d-flex justify-content-center my-5">
        <div className="card bg-secondary text-light p-4" style={{ maxWidth: '760px', width: '100%' }}>

          {/* Row 1: Title */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h3 className="card-title">{auth.id ? "Edit Blog" : "Add Blog"}</h3>
            </div>
          </div>

          {/* Row 2: ImgUrl (Preview) + Description */}
          <div className="row mb-4">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              {imgUrl ? (
                <img src={imgUrl} className="img-fluid rounded" alt="Preview" style={{ maxHeight: '200px' }} />
              ) : (
                <div className="text-muted">Image preview</div>
              )}
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Row 3: Submit Button */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center gap-3">
              <button onClick={handleSubmit} className="btn btn-primary">
                {auth.id ? "Update Blog" : "Add Blog"}
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  auth.setId("");
                  navigate('/profile');
                }}
              >
                Close
              </button>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}

export default AddBlog 