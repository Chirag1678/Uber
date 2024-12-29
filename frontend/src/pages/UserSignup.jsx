import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const submitHandler =async (event) => {
    event.preventDefault();

    const newUser = {
      fullname: {
          firstname: firstName,
          lastname: lastName,
      },
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home'); 
    }
    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
  return (
    <div className="pt-8 pb-4 h-screen px-5 flex flex-col justify-between">
     <div>
        <img className="w-20 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={e=>submitHandler(e)}>
           <h3 className="text-xl mb-2">What&apos;s your name</h3>
           <div className="flex items-center justify-between gap-2">
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} className="bg-[#eeeeee] mb-3 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="First name" required/>
            <input value={lastName} onChange={e=>setLastName(e.target.value)} className="bg-[#eeeeee] mb-3 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="Last name"/>
           </div>
           <h3 className="text-xl mb-2">What&apos;s your email</h3>
           <input value={email} onChange={e=>setEmail(e.target.value)} className="bg-[#eeeeee] mb-3 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="email" placeholder="email@example.com" required/>
           <h3 className="text-xl mb-2">Enter Password</h3>
           <input value={password} onChange={e=>setPassword(e.target.value)} className="bg-[#eeeeee] mb-5 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="password" placeholder="password" required/>
           <button className="w-full bg-black text-white py-3 rounded-xl text-lg cursor-pointer" type="submit">Create account</button>
           <p className="text-center mt-2">Already have an account? <Link to='/login' className="text-blue-600">Login here</Link></p>
        </form>
     </div>
     <p className="text-sm text-[#565656] leading-tight">This site is protected by reCAPTCHA and the <span className="text-black font-bold underline">Google Privacy Policy</span> and <span className="text-black font-bold underline">Terms of Service</span> apply.</p>
    </div>
  )
}

export default UserSignup
