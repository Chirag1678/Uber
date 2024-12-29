import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const LiveTracking = () => {
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
            lat: latitude,
            lng: longitude
        });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
            lat: latitude,
            lng: longitude
        });
    });

    return () => navigator.geolocation.clearWatch(watchId);
}, []);

  useEffect(() => {
    // Function to get user's current location
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    };

    getUserLocation();
    const interval = setInterval(getUserLocation, 5000); // Update location every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className='w-full h-full'>
      <LoadScript googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={userLocation || { lat: -34.397, lng: 150.644 }} // Default center
          zoom={15}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default LiveTracking
