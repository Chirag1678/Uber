import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      if(response.status === 200) {
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    }).catch(error => {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/captain-login');
    });
  },[navigate, token]);

  return (
    <div>
      captainlogout
    </div>
  )
}

export default CaptainLogout