import { useRef, useState } from "react"
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom"
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(()=>{
    if(finishRidePanel){
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    }
    else{
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[finishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
        <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className="cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="ri-logout-box-r-line text-lg font-semibold"></i>
        </Link>
      </div>
      <div onClick={()=>setFinishRidePanel(false)} className="h-4/5">
        {/* <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className="h-full w-full object-cover"/> */}
        <LiveTracking/>
      </div>
      <div onClick={()=>setFinishRidePanel(true)} className="h-1/5 p-4 flex items-center justify-between bg-yellow-500/85 relative">
        <div className="text-center w-[95vw] absolute top-0" onClick={()=>{}}>
            <i className="ri-arrow-up-wide-line text-black text-3xl"></i>
        </div>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold py-2 px-10 rounded-lg">Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed z-10 bottom-0 bg-white w-full p-4">
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding
