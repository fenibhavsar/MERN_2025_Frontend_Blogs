import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidUserCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const UserDetail = ({ id }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const api = await axios.get(`https://mern-2025-blogs.onrender.com/api/users/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            setUser(api.data.user)
        }
        fetchUser();
    }, [])

    return (
        <>
            <h6><BiSolidUserCircle /> {" "} {user.name}</h6>
            {/* <h6><MdEmail /> {" "} {user.email}</h6> */}
        </>
    )
}

export default UserDetail 