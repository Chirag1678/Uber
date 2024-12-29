const RidePopUp = ({ride, setRidePopupPanel, setConfirmRidePopup, confirmRide}) => {
  return (
    <div>
        {ride && <>
        <p className="text-center text-xl font-semibold border-b pb-4">New Ride Available!</p>
        <div className="my-3 bg-yellow-500/85 py-4 px-4 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" className="h-10 w-10 rounded-full"/>
                    <h1 className="text-lg font-medium">{ride.user.fullname.firstname} {ride.user.fullname.lastname}</h1>
                </div>
                <h1 className="text-lg font-semibold">{ride.distance} Kms</h1>
            </div>
        </div>
        <div className="w-full border-t">
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-map-pin-2-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1 capitalize">{ride.pickup.split(",")[0]}</h2> 
                    <p className="text-[#7e7e7e]">{ride.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4 border-b py-3">
                <i className="ri-square-fill"></i>
                <div>
                    <h2 className="font-bold text-xl pb-1 capitalize">{ride.destination.split(",")[0]}</h2>
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
        <div className="flex items-center gap-x-3">
            <button onClick={()=>{setConfirmRidePopup(true); confirmRide();}} className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Accept</button>
            <button onClick={()=>setRidePopupPanel(false)} className="w-full bg-[#7e7e7e] text-white font-semibold p-2 rounded-lg">Ignore</button>
        </div>
        </>}
    </div>
  )
}

export default RidePopUp
