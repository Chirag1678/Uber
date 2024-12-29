import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {captain, setCaptain} = useContext(CaptainDataContext);
  
  const submitHandler =async (event) => {
    event.preventDefault();
    
    const captainData = {
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

    if(response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="pb-8 pt-6 h-screen px-5 flex flex-col justify-between">
     <div>
        <img className="w-16 mb-5" src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={e=>submitHandler(e)}>
           <h3 className="text-xl mb-2">What&apos;s your email</h3>
           <input value={email} onChange={e=>setEmail(e.target.value)} className="bg-[#eeeeee] mb-6 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="email" placeholder="email@example.com" required/>
           <h3 className="text-xl mb-2">Enter Password</h3>
           <input value={password} onChange={e=>setPassword(e.target.value)} className="bg-[#eeeeee] mb-6 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="password" placeholder="password" required/>
           <button className="w-full bg-black text-white py-3 rounded-xl text-lg" type="submit">Login</button>
           <p className="text-center mt-2">Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link></p>
        </form>
     </div>
     <Link to='/login' className="flex items-center justify-center w-full bg-green-500/85 text-white py-3 my-6 rounded-xl text-lg">Sign in as User</Link>
    </div>
  )
}

export default CaptainLogin
