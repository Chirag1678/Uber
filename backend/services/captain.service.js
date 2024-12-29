const captainModel = require('../models/captain.model.js');

module.exports.createCaptain = async ({
    firstname,lastname,email,password,
    color,plate,capacity,vehicleType
}) => {
    if(!firstname || !email || !password || !plate || !capacity || !vehicleType || !color){
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};