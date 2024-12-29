import { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import DriverAssigned from "../components/DriverAssigned";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitForDriver, setWaitForDriver] = useState(false);
  const [assignedDriver, setAssignedDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState('pickup');
  const [fares, setFares] = useState({});
  const [vehicleType, setVehicleType] = useState('');
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitDriverRef = useRef(null);
  const assignedDriverRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit('join', {userType: 'user', userId: user._id});
  }, [user]);

  socket.on('ride-confirmed', data => {
    // console.log(data);
    setRide(data);
    setAssignedDriver(true);
  });

  socket.on('ride-started', ride => {
    // console.log(data);
    setAssignedDriver(false);
    navigate('/riding', {state: { ride }});
  });
  
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.status === 200){
            setVehiclePanel(true);
            setFares(response.data.fares);
        }
        else{
            console.error("Error fetching fares:", response);
        }
    } catch (error) {
      console.error("Error fetching fares:", error);
    }
  };

  const fetchSuggestions = async (input) => {
    if (input.length < 3) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const createRide = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
            pickup,
            destination,
            vehicleType
        },{
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions(pickup);
  }, [pickup]);

  useEffect(() => {
    fetchSuggestions(destination);
  }, [destination]);

  useGSAP(()=>{
    if(panelOpen) {
        gsap.to(panelRef.current, {
            height: '70vh',
            display: 'flex',
        })
    }
    else {
        gsap.to(panelRef.current, {
            height: 0,
            display: 'none'
        });
    }
  },[panelOpen]);

  useGSAP(()=>{
    if(vehiclePanel){
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
        setPanelOpen(false);
    }
    else{
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[vehiclePanel]);

  useGSAP(()=>{
    if(confirmRidePanel){
        gsap.to(confirmRideRef.current, {
            transform: 'translateY(0)'
        })
        setVehiclePanel(false);
    }
    else{
        gsap.to(confirmRideRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[confirmRidePanel]);

  useGSAP(()=>{
    if(waitForDriver){
        gsap.to(waitDriverRef.current, {
            transform: 'translateY(0)'
        })
        setConfirmRidePanel(false);
    }
    else{
        gsap.to(waitDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[waitForDriver]);

  useGSAP(()=>{
    if(assignedDriver){
        gsap.to(assignedDriverRef.current, {
            transform: 'translateY(0)'
        })
        setWaitForDriver(false);
    }
    else{
        gsap.to(assignedDriverRef.current, {
            transform: 'translateY(100%)'
        })
    }
  },[assignedDriver]);


  return (
    <div className="h-screen relative">
      <img className="absolute w-20 left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className="h-screen w-screen">
        {/* temporary image map */}
        <LiveTracking/>
      </div>
      <div className={`h-full flex flex-col justify-end absolute top-0 w-full`}>
        <div className={`${panelOpen?'h-[40vh]':'h-[30vh]'} bg-white p-5 ${panelOpen?'':'rounded-t-3xl'} relative`}>
            {panelOpen && <i className="absolute ri-arrow-down-s-line text-3xl leading-none top-6 left-40" onClick={()=>setPanelOpen(false)}></i>}
            <h4 className="text-3xl font-semibold">Find a trip</h4>
            <form onSubmit={e=>submitHandler(e)}>
                <div className={`absolute h-16 w-1 bg-black ${panelOpen?'top-[35%]':'top-[48.5%]'} left-9 rounded-full`}></div>
                <input 
                  value={pickup} 
                  onFocus={() => setActiveInput('pickup')}
                  onClick={() => setPanelOpen(true)} 
                  onChange={e => setPickup(e.target.value)} 
                  className="bg-[#eeeeee] px-10 py-2 text-lg w-full rounded-xl mt-5" 
                  type="text" 
                  placeholder="Add a pickup location"
                  required
                />
                <input 
                  value={destination} 
                  onFocus={() => setActiveInput('destination')}
                  onClick={() => setPanelOpen(true)} 
                  onChange={e => setDestination(e.target.value)} 
                  className="bg-[#eeeeee] px-10 py-2 text-lg w-full rounded-xl mt-3" 
                  type="text" 
                  placeholder="Enter your destination"
                  required
                />
                {panelOpen && <button type="submit" className="w-full bg-black text-white py-3 rounded-xl text-lg mt-4">
                    Find Rides
                </button>}
            </form>
        </div>
        <div ref={panelRef} className="bg-white pl-[1.45rem] pr-5 overflow-y-scroll">
            <LocationSearchPanel 
                suggestions={suggestions}
                setPickup={setPickup}
                setDestination={setDestination}
                activeInput={activeInput}
                setActiveInput={setActiveInput}
            />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 bg-white w-full p-4 rounded-t-3xl">
        <VehiclePanel fares={fares} setVehicleType={setVehicleType} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
      <div ref={confirmRideRef} className="fixed z-10 bottom-0 bg-white w-full p-4">
        <ConfirmRide vehicleType={vehicleType} fares={fares} pickup={pickup} destination={destination} createRide={createRide} confirmRidePanel={confirmRidePanel} setConfirmRidePanel={setConfirmRidePanel} setWaitForDriver={setWaitForDriver}/>
      </div>
      <div ref={waitDriverRef} className="fixed z-10 bottom-0 bg-white w-full p-4">
        <WaitForDriver vehicleType={vehicleType} fares={fares} pickup={pickup} destination={destination} waitForDriver={waitForDriver} setWaitForDriver={setWaitForDriver}/>
      </div>
      <div ref={assignedDriverRef} className="fixed z-10 bottom-0 bg-white w-full p-4">
        <DriverAssigned ride={ride} assignedDriver={assignedDriver} setAssignedDriver={setAssignedDriver}/>
      </div>
    </div>
  )
}

export default Home
