const userModel = require('../models/user.model.js');

module.exports.createUser =async ({firstname,password,email,lastname}) => {
    if(!firstname || !password || !email){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    return user;
};