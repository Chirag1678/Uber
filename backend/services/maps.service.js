const axios = require('axios');
const captainModel = require('../models/captain.model');
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.getAddressCoordinates = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        }
        else{
            throw new Error("Unable to fetch coordinates");
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin,destination) => {
    if(!origin || !destination){
        throw new Error("Origin and destination are required");
    }
    
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const data = response.data.rows[0].elements[0];
            if(data.status === 'ZERO RESULTS'){
                throw new Error("No routes found");
            }
            return data;
        } else {
            throw new Error("Unable to fetch distance and time");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getSuggestions = async (input) => {
    if(!input){
        throw new Error("Query is required");
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error("Unable to fetch suggestions");
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
};

module.exports.getCaptainsNearby = async (ltd, lng, radius, vehicleType) => {
    //radius is in kms
    if(!ltd || !lng){
        throw new Error("Latitude and longitude are required");
    }

    if(!radius){
        radius = 2; // Default 2km radius if not specified
    }

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        },
    });

    const updatedCaptains = captains.filter(captain => captain.vehicle.vehicleType == vehicleType);
    // console.log(updatedCaptains);
    return updatedCaptains;
}