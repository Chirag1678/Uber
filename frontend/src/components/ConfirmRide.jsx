const ConfirmRide = ({vehicleType, fares, pickup, destination, createRide, confirmRidePanel, setConfirmRidePanel, setWaitForDriver}) => {
  const ride = {
    auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
    moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
    car: 'https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png'
  }

  if(!confirmRidePanel) return null;
  return (
    <div>
        <div className="relative">
            {confirmRidePanel && <i className="absolute ri-arrow-down-s-line text-3xl leading-none right-[3.5rem]" onClick={()=>setConfirmRidePanel(false)}></i>}
            <p className="text-center text-xl font-semibold border-b pb-4">Confirm your ride</p>
        </div>
        <div className="flex items-center flex-col justify-center">
            <img src={ride[vehicleType]} alt="" className="h-32"/>
        </div>
        <div className="w-full border-t">
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{pickup.split(',')[0]}</h2> 
                    <p className="text-[#7e7e7e]">{pickup.split(',').splice(1)}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-square-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">{destination.split(',')[0]}</h2>
                    <p className="text-[#7e7e7e]">{destination.split(',').splice(1)}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-bank-card-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1">&#8377;{fares[vehicleType]}</h2>
                    <p className="text-[#7e7e7e]">Cash Cash</p>
                </div>
            </div>
        </div>
        <button onClick={async ()=>{
            await createRide();
            setWaitForDriver(true);
        }} className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Confirm</button>
    </div>
  )
}

export default ConfirmRide
