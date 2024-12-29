import axios from "axios"
import { useNavigate } from "react-router-dom";

const FinishRide = ({rideData, setFinishRidePanel}) => {
  // console.log(rideData);
  const navigate = useNavigate();
  const endRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
        rideId: rideData._id
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.status === 200){
        setFinishRidePanel(false);
        // console.log(response)
        navigate('/captain-home');
      }
      else{
        console.error("Error ending ride:", response);
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }
  return (
    <div>
      <p className="text-center text-xl font-semibold border-b pb-4">Finish Ride</p>
        <div className="my-3 bg-yellow-500/85 py-4 px-4 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" className="h-10 w-10 rounded-full"/>
                    <h1 className="text-lg font-medium">{rideData.user.fullname.firstname} {rideData.user.fullname.lastname}</h1>
                </div>
                <h1 className="text-lg font-semibold">{rideData.distance} Kms</h1>
            </div>
        </div>
        <div className="w-full border-t">
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{rideData.pickup.split(",")[0]}</h2> 
                    <p className="text-[#7e7e7e]">{rideData.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-square-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{rideData.destination.split(',')[0]}</h2>
                    <p className="text-[#7e7e7e]">{rideData.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-bank-card-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">&#8377;{rideData.fare}</h2>
                    <p className="text-[#7e7e7e]">Cash Cash</p>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <div className="flex items-center gap-x-3">
                <button onClick={()=>endRide()} to='/captain-riding' className="w-full bg-green-600 text-white text-center font-semibold p-2 rounded-lg">Finish Ride</button>
            </div>
            <p className="text-sm text-red-500 mt-3 text-center">**Click on finish ride button if received payment**</p>
        </div>
    </div>
  )
}

export default FinishRide
