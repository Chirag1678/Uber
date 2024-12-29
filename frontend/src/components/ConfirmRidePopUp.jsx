import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const ConfirmRidePopUp = ({ride, setConfirmRidePopup}) => {
  const [input, setInput] = useState('');

  const navigate = useNavigate();

  const submitHandler =async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
            params: { rideId: ride._id, otp: input },
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.status === 200){
            setConfirmRidePopup(false);
            navigate('/captain-riding', {state: { ride }});
            // console.log(response);
            // console.log("Ride confirmed");
        }
        else{
            console.error("Error confirming ride:", response);
        }
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }
  return (
    <div>
      {ride && <>
        <p className="text-center text-xl font-semibold border-b pb-4">Confrim Ride To Start</p>
        <div className="my-3 bg-yellow-500/85 py-4 px-4 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" className="h-10 w-10 rounded-full"/>
                    <h1 className="text-lg font-medium capitalize">{ride.user.fullname.firstname} {ride.user.fullname.lastname}</h1>
                </div>
                <h1 className="text-lg font-semibold">{ride.distance} Kms</h1>
            </div>
        </div>
        <div className="w-full border-t">
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{ride.pickup.split(',')[0]}</h2> 
                    <p className="text-[#7e7e7e]">{ride.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-square-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{ride.destination.split(',')[0]}</h2>
                    <p className="text-[#7e7e7e]">{ride.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-bank-card-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">&#8377;{ride.fare}</h2>
                    <p className="text-[#7e7e7e]">Cash Cash</p>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <form onSubmit={(e)=>submitHandler(e)}>
                <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Enter OTP" className="bg-[#eee] px-4 py-2 font-mono text-lg rounded-lg mb-3 w-full"/>
                <div className="flex items-center gap-x-3">
                    <button type="submit" className="w-full bg-green-600 text-white text-center font-semibold p-2 rounded-lg">Confirm</button>
                    <button onClick={()=>setConfirmRidePopup(false)} className="w-full bg-[#f84343] text-white font-semibold p-2 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
      </>}
    </div>
  )
}

export default ConfirmRidePopUp
