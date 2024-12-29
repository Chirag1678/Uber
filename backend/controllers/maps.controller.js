const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');

module.exports.getCoordinates = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { address } = req.query;

    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(error.statusCode).json({message: "Coordinates not found"});
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { origin, destination } = req.query;

    try {
        const data = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.statusCode).json({message: "No routes found"});
    }
};

module.exports.getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { input } = req.query;

    try {
        const suggestions = await mapsService.getSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};