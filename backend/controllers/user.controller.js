const userModel = require('../models/user.model.js');
const blacklistModel = require('../models/blacklistToken.model.js');
const userService = require('../services/user.service.js');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;

    const isExist = await userModel.findOne({email});

    if(isExist){
        res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    res.status(201).json({token,user});
};

module.exports.loginUser = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: "Invalid email or passord"});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    res.status(200).json({token,user});
};

module.exports.logoutUser = async (req,res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message: "Logged out successfully"});
};

module.exports.getUserProfile = async (req,res) => {
    const user = req.user;

    res.status(200).json({user});
};