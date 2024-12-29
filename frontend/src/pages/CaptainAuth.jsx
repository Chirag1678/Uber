import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainAuth = ({children}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {captain, setCaptain} = useContext(CaptainDataContext);

  useEffect(()=>{
    if(!token){
        navigate('/captain-login');
        return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response=>{
        if(response.status === 200){
            setCaptain(response.data.captain);
            setIsLoading(false);
        }
    })
    .catch(error=>{
        console.error(error);
        localStorage.removeItem('token');
        navigate('/captain-login');
    });
  },[token, navigate, setCaptain]);

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

export default CaptainAuth