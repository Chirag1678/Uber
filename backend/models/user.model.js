const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String, 
            required: true,
            minlength: [3, "First name must be 3 characters long"]
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this.id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePassword =async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword =async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = User;