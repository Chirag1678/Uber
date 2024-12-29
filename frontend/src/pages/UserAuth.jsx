import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserAuth = ({children}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {user, setUser} = useContext(UserDataContext);

  useEffect(()=>{
    if(!token){
        navigate('/login');
        return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        if(response.status === 200){
            setUser(response.data.user);
            setIsLoading(false);
        }
    })
    .catch(error=>{
        console.error(error);
        localStorage.removeItem('token');
        navigate('/login');
    })
  },[token, navigate, setUser]);

  if(isLoading){
    return (
        <div>Loading...</div>
    )
  }

  return (
    <>
        {children}
    </>
  )
}

export default UserAuth