import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate = useNavigate();
  const {captain, setCaptain}= useContext(CaptainDataContext);

  
  const submitHandler =async (event) => {
    event.preventDefault();
    
    const newCaptain = {
      fullname: {
          firstname: firstName,
          lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  }
  return (
    <div className="pb-4 pt-6 h-screen px-5 flex flex-col justify-between">
     <div>
     <img className="w-16 mb-5" src="https://pngimg.com/d/uber_PNG24.png" alt="" />
     <form onSubmit={e=>submitHandler(e)}>
           <h3 className="text-xl mb-2">What&apos;s your name</h3>
           <div className="flex items-center justify-between gap-2">
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="First name" required/>
            <input value={lastName} onChange={e=>setLastName(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="Last name"/>
           </div>
           <h3 className="text-xl mb-2">What&apos;s your email</h3>
           <input value={email} onChange={e=>setEmail(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="email" placeholder="email@example.com" required/>
           <h3 className="text-xl mb-2">Enter Password</h3>
           <input value={password} onChange={e=>setPassword(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-full text-lg placeholder:text-base text-black" type="password" placeholder="password" required/>
           <h3 className="text-xl mb-2">Vehicle Details</h3>
           <div className="flex items-center justify-between gap-2">
            <input value={color} onChange={e=>setColor(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="Vehicle Color" required/>
            <input value={plate} onChange={e=>setPlate(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="text" placeholder="Plate Number" required/>
           </div>
           <div className="flex items-center justify-between gap-2">
            <input value={capacity} onChange={e=>setCapacity(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" type="number" placeholder="Seating Capacity" required/>
            <select value={vehicleType} onChange={e=>setVehicleType(e.target.value)} className="bg-[#eeeeee] mb-2 rounded-lg py-2 px-4 border w-1/2 text-lg placeholder:text-base text-black" required>
              <option value="">Select Type</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Moto</option>
              <option value="car">Car</option>
            </select>
           </div>
           <button className="w-full bg-black text-white py-3 rounded-xl text-lg" type="submit">Create account</button>
           <p className="text-center mt-2">Already have an account? <Link to='/captain-login' className="text-blue-600">Login here</Link></p>
        </form>
     </div>
     <p className="text-sm text-[#565656] leading-tight">This site is protected by reCAPTCHA and the <span className="text-black font-bold underline">Google Privacy Policy</span> and <span className="text-black font-bold underline">Terms of Service</span> apply.</p>
    </div>
  )
}

export default CaptainSignUp
