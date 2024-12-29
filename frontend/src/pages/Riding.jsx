import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    // console.log(data);
    navigate('/home')
  })


  const rideImg = {
    auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
    moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
    car: 'https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png'
  }
  return (
    <div className="h-screen">
      <Link to='/home' className="fixed cursor-pointer h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full">
        <i className="ri-home-5-line text-lg font-semibold"></i>
      </Link>
      <div className="h-1/2">
        {/* <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className="h-full w-full object-cover"/> */}
        <LiveTracking/>
      </div>
      <div className="h-1/2 px-4">
        <div className="flex items-center justify-between py-4">
            <img src={rideImg[ride.captain.vehicle.vehicleType]} alt="" className="h-[7rem] -mt-1"/>
            <div className="text-end">
                <h1 className="text-lg font-medium text-[#7e7e7e] capitalize">{ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</h1>
                <h3 className="text-xl font-semibold">{ride.captain.vehicle.plate}4</h3>
                <p className="text-lg font-semibold text-[#7e7e7e] capitalize">{ride.captain.vehicle.vehicleType}</p>
                <div className="flex items-center gap-x-2 justify-end text-[#7e7e7e]">
                <i className="ri-star-fill"></i>
                <p className="">4.5</p>
                </div>
            </div>
        </div>
        <div className="w-full border-t">
            <div className="flex items-center gap-x-4 border-b py-2">
                <i className="ri-square-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{ride.destination.split(',')[0]}</h2>
                    <p className="text-[#7e7e7e]">{ride.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 pt-2">
                <i className="ri-bank-card-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">&#8377;{ride.fare}</h2>
                    <p className="text-[#7e7e7e]">Cash Cash</p>
                </div>
            </div>
        </div>
        <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg my-2">Make a payment</button>
      </div>
    </div>
  )
}

export default Riding
