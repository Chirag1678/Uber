import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);
  
  const submitHandler =async (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <div className="py-8 h-screen px-5 flex flex-col justify-between">
     <div>
        <img className="w-20 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={e=>submitHandler(e)}>
           <h3 className="text-xl mb-2">What&apos;s your email</h3>
           <input value={email} onChange={e=>setEmail(e.target.value)} className="bg-[#eeeeee] mb-6 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="email" placeholder="email@example.com" required/>
           <h3 className="text-xl mb-2">Enter Password</h3>
           <input value={password} onChange={e=>setPassword(e.target.value)} className="bg-[#eeeeee] mb-6 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="password" placeholder="password" required/>
           <button className="w-full bg-black text-white py-3 rounded-xl text-lg" type="submit">Login</button>
           <p className="text-center mt-2">New here? <Link to='/signup' className="text-blue-600">Create new account</Link></p>
        </form>
     </div>
     <Link to='/captain-login' className="flex items-center justify-center w-full bg-yellow-500/85 text-white py-3 my-6 rounded-xl text-lg">Sign in as Captain</Link>
    </div>
  )
}

export default UserLogin
