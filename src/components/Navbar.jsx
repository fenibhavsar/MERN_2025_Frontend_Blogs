import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import context from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { BiLogIn } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
    const auth = useContext(context);
    const navigate = useNavigate();

    const logOut = async () => {
        const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/users/logout`, {
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
        });

        auth.setIsAuthenticated(false);
        auth.setUser(null);

        setTimeout(() => navigate('/'), 1500);
    };

    if (auth.isAuthenticated === null) return null; // Wait for auth to load



    return (
        <>
            <ToastContainer /* ... */ />
            <div className='navbar'>
                <Link to={'/'} className='left'>
                    <h2>Blogs</h2>
                </Link>
                <div className='right'>
                    {!auth.isAuthenticated && (
                        <>
                            <Link to="/login" className="items"><h3><BiLogIn /></h3></Link>
                            <Link to="/register" className="items"><h3>Register</h3></Link>
                        </>
                    )}

                    {
                        auth.isAuthenticated && (
                            <>
                                {/* <Link to="/addblog" className="items"><h3>AddBlog</h3></Link> */}
                                <NavLink
                                    to="/addblog"
                                    className={`nav-link ${auth.id ? 'disabled text-muted me-2' : 'me-2'}`}
                                    onClick={(e) => auth.id && e.preventDefault()} // prevent navigation
                                >
                                 <h3>AddBlog</h3>
                                </NavLink>
                                {/* <Link to="/profile" className="items"><h3><BiSolidUserCircle /></h3></Link> */}
                                <NavLink
                                    to="/profile"
                                    className={`nav-link ${auth.id ? 'disabled text-muted me-2' : 'me-2'}`}
                                    onClick={(e) => auth.id && e.preventDefault()} // prevent navigation
                                >
                                 <h3><BiSolidUserCircle /></h3> 
                                </NavLink>

                                <div onClick={logOut} className="items"><h3><BiLogOut /></h3></div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar 