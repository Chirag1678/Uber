const DriverAssigned = ({ride}) => {
    const rideImg = {
        auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
        moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
        car: 'https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png'
      }
  return (
    <div>
        {ride && <>
        <div className="flex items-center justify-between pb-4 border-b">
            <p className="text-xl font-semibold">Meet at the pickup point</p>
            <p className="bg-black text-white text-xl text-center px-4 py-[0.35rem]">2 <br/>min</p>
        </div>
        <div className="flex items-center justify-between py-2">
            <img src={rideImg[ride.captain.vehicle.vehicleType]} alt="" className="h-32"/>
            <div className="text-end">
                <h1 className="text-lg font-medium text-[#7e7e7e]">{ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</h1>
                <h3 className="text-xl font-semibold">{ride.captain.vehicle.plate}</h3>
                <p className="text-sm text-[#7e7e7e] capitalize">{ride.captain.vehicle.vehicleType}</p>
                <p className="text-lg font-semibold">OTP - {ride.otp}</p>
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
            <div className="flex items-center gap-x-4 pt-3">
                <i className="ri-bank-card-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">&#8377;{ride.fare}</h2>
                    <p className="text-[#7e7e7e]">Cash Cash</p>
                </div>
            </div>
        </div>
        </>}
    </div>
  )
}

export default DriverAssigned
