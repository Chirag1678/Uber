import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }).catch(error => {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/login');
    });
  },[navigate, token]);

  return (
    <div>
      userlogout
    </div>
  )
}

export default UserLogout
