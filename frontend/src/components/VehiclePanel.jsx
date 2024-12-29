const VehiclePanel = ({fares, setVehicleType, vehiclePanel, setVehiclePanel, setConfirmRidePanel}) => {
  return (
    <div>
        {vehiclePanel && <i className="absolute ri-arrow-down-s-line text-3xl leading-none top-6 right-[7.5rem]" onClick={()=>setVehiclePanel(false)}></i>}
        <h3 className="text-2xl font-semibold mb-5 px-4 pt-1">Choose a Vehicle</h3>
        <div onClick={()=>{setVehicleType('car'); setConfirmRidePanel(true);}} className="flex items-center justify-between border-4 rounded-xl active:border-black border-white px-2 py-1 mb-3">
            <img src="https://i.pinimg.com/originals/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.png" alt="" className="h-16 pr-2"/>
            <div className="w-2/3">
                <h4 className="font-medium text-sm">UberGo <span><i className="ri-user-fill"></i> 4</span></h4>
                <h5 className="font-light text-sm">2 mins away</h5>
                <p className="text-sm">Affordable, compact rides</p>
            </div>
            <div>
                <p>&#8377;{fares && fares.car}</p>
            </div>
        </div>
        <div onClick={()=>{setVehicleType('moto'); setConfirmRidePanel(true);}} className="flex items-center justify-between border-4 rounded-xl active:border-black border-white px-2 py-1 mb-3">
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" className="h-10 pr-2"/>
            <div className="w-2/3">
                <h4 className="font-medium text-sm">Moto <span><i className="ri-user-fill"></i> 1</span></h4>
                <h5 className="font-light text-sm">3 mins away</h5>
                <p className="text-sm">Affordable, motorcycle ride</p>
            </div>
            <div>
                <p>&#8377;{fares && fares.moto}</p>
            </div>
        </div>
        <div onClick={()=>{setVehicleType('auto'); setConfirmRidePanel(true);}} className="flex items-center justify-between border-4 rounded-xl active:border-black border-white px-2 py-1 h-[4.85rem]">
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" className="h-10 pr-2"/>
            <div className="w-2/3">
                <h4 className="font-medium text-sm">UberAuto <span><i className="ri-user-fill"></i> 3</span></h4>
                <h5 className="font-light text-sm">2 mins away</h5>
            </div>
            <div>
                <p>&#8377;{fares && fares.auto}</p>
            </div>
        </div>
    </div>
  )
}

export default VehiclePanel
