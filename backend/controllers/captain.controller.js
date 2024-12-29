const captainModel = require('../models/captain.model.js');
const blacklistModel = require('../models/blacklistToken.model.js');
const captainService = require('../services/captain.service.js');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const isExist = await captainModel.findOne({email});

    if(isExist){
        res.status(400).json({message: 'Captain already exists'});
    }

    const hashedPassword = await captainModel.hashPassword(password); 

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    res.status(201).json({token,captain});
};

module.exports.loginCaptain = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid email or passord"});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    res.status(200).json({token,captain});
};

module.exports.logoutCaptain = async (req,res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.auhtorization?.split(' ')[1];
    await blacklistModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});
};

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain;

    res.status(200).json({captain});
};