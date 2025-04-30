import React, { useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';
import axios from 'axios';

const Home = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/blogs/allblogs`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      setBlog(api.data.blogs);
    };
    fetchBlog();
  }, []);

  return (
    <>
      <div className="container text-center my-5" style={{ width: '50%' }}>
        {blog.map((data) => (
          <div
            key={data._id}
            className="card mb-3 bg-secondary text-light p-3"
            style={{ maxWidth: '760px', width: '100%' }}
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
                <img
                  src={data.imgUrl}
                  className="img-fluid rounded"
                  alt="Blog"
                  style={{ maxHeight: '200px' }}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <p className="card-text">{data.description}</p>
              </div>
            </div>

            {/* Row 3: CreatedAt + UserDetail (left) */}
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <div className='me-3 mt-2'> <UserDetail id={data.user} /></div>

                <small className="me-3">{new Date(data.createdAt).toLocaleString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
