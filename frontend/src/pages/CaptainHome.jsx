import { Link } from "react-router-dom"
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp"
import { useContext, useEffect, useRef, useState } from "react"
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [ConfirmRidePopup, setConfirmRidePopup] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit('join', {userType: 'captain', userId: captain._id});

    // Function to get current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          };
          socket.emit('update-location-captain', {
            userId: captain._id,
            location
          });
        }, (error) => {
          console.error("Error getting location:", error);
        });
      }
    };
    // Set interval to update location every 10 seconds
    const locationInterval = setInterval(getCurrentLocation, 10000);
    // Cleanup interval on component unmount
    return () => clearInterval(locationInterval);
  },[captain]);

  socket.on('new-ride', data => {
    // console.log(data);
    setRide(data);
    setRidePopupPanel(true);
  });

  const confirmRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{rideId: ride._id},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    setRidePopupPanel(false);
    setConfirmRidePopup(true);
  }

  useGSAP(()=>{
    if(ridePopupPanel){
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    }
    else{
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[ridePopupPanel]);

  useGSAP(()=>{
    if(ConfirmRidePopup){
        gsap.to(confirmRidePopupRef.current, {
            transform: 'translateY(0)'
        })
        setRidePopupPanel(false);
    }
    else{
        gsap.to(confirmRidePopupRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[ConfirmRidePopup]);

  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
            <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/captain-home' className="cursor-pointer h-10 w-10 bg-white flex items-center justify-center rounded-full">
              <i className="ri-logout-box-r-line text-lg font-semibold"></i>
            </Link>
      </div>
      <div onClick={()=>{
        setRidePopupPanel(false);
        setConfirmRidePopup(false);
      }} className="h-[65%]">
        {/* <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className="h-full w-full object-cover"/> */}
        <LiveTracking/>
      </div>
      <div className="h-[35%] p-4">
        <CaptainDetails/>
      </div>
      <div ref={ridePopupPanelRef} className="fixed z-10 bottom-0 bg-white w-full p-4">
        <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopup={setConfirmRidePopup} confirmRide={confirmRide}/>
      </div>
      <div ref={confirmRidePopupRef} className="fixed h-screen z-10 bottom-0 bg-white w-full p-4">
        <ConfirmRidePopUp ride={ride} setConfirmRidePopup={setConfirmRidePopup}/>
      </div>
    </div>
  )
}

export default CaptainHome
