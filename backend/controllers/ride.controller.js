const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapsService = require('../services/maps.service');
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const user = req.user;
    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: user._id,
            pickup,
            destination,
            vehicleType
        });
        res.status(201).json(ride);

        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);

        const captainsNearby = await mapsService.getCaptainsNearby(pickupCoordinates.ltd, pickupCoordinates.lng, 2, vehicleType);
        
        ride.otp = ""

        const rideUser = await rideModel.findOne({_id:ride._id}).populate('user');

        captainsNearby.map(async captain => {
            sendMessageToSocketId(captain.socketId,{
                event: 'new-ride',
                data: rideUser
            });
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports.getFare = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { pickup, destination } = req.query;

    try {
        const { fares, distance, duration } = await rideService.getFare(pickup, destination);
        res.status(200).json({fares, distance, duration});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports.confirmRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const captain = req.captain;
    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide(rideId, captain._id);
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

module.exports.startRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const captain = req.captain;
    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide(rideId, otp, captain);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

module.exports.endRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const captain = req.captain;
    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide(rideId, captain);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};