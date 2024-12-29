const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

const getFare = async (pickup, destination) => {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    try {
        const data = await mapsService.getDistanceTime(pickup, destination);
        const distance = data.distance.value / 1000; // Convert to km
        const duration = data.duration.value / 60; // Convert to minutes
        const baseFares = {
            auto: 30,
            car: 50, 
            moto: 20
        };

        const perKmRates = {
            auto: 10,
            car: 15,
            moto: 8
        };

        const perMinRates = {
            auto: 2,
            car: 3, 
            moto: 1.5
        };

        const fares = {
            auto: Number((baseFares.auto + (distance * perKmRates.auto) + (duration * perMinRates.auto)).toFixed(2)),
            car: Number((baseFares.car + (distance * perKmRates.car) + (duration * perMinRates.car)).toFixed(2)),
            moto: Number((baseFares.moto + (distance * perKmRates.moto) + (duration * perMinRates.moto)).toFixed(2))
        };

        return {
            fares,
            distance: Number(distance.toFixed(2)), 
            duration: Number(duration.toFixed(2))
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getFare = getFare;

const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
    return otp;
};

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const {fares,distance,duration} = await getFare(pickup, destination);

    try {
        const ride = await rideModel.create({
            user: user._id,
            pickup,
            destination,
            fare: fares[vehicleType],
            distance,
            duration,
            otp: getOtp(6)
        });

        return ride;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.confirmRide = async (rideId, captainId) => {
    if(!rideId || !captainId) {
        throw new Error('Ride id and captain id are required');
    }

    try {
        await rideModel.findOneAndUpdate({_id:rideId}, {status: "accepted", captain: captainId});
        const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp');

        if (!ride) {
            throw new Error('Ride not found');
        }
    
        return ride;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.startRide = async (rideId, otp, captain) => {
    if(!rideId || !otp || !captain) {
        throw new Error('Ride id, OTP and captain are required');
    }

    try {
        const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
        if(!ride) {
            throw new Error('Ride not found');
        }
        if(ride.status !== 'accepted') {
            throw new Error('Ride is not accepted');
        }
        if(ride.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        await rideModel.findOneAndUpdate({_id: rideId}, {status: 'ongoing'});

        return ride;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.endRide = async (rideId, captain) => {
    if(!rideId || !captain) {
        throw new Error('Ride id and captain are required');
    }

    try {
        const ride = await rideModel.findOne({_id: rideId}).populate('user');
        if(!ride) {
            throw new Error('Ride not found');
        }
        if(ride.status !== 'ongoing') {
            throw new Error('Ride is not ongoing');
        }
        await rideModel.findOneAndUpdate({_id: rideId, captain: captain._id}, {status: 'completed'});
        return ride;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};