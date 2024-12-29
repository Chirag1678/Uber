const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        required: true,
        minlength: [3, "Pickup address must be 3 characters long"]
    },
    destination: {
        type: String,
        required: true,
        minlength: [3, "Destination address must be 3 characters long"]
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    },
    otp:{
        type: String,
        select: false,
        required: true
    }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;