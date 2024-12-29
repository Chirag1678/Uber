const mongoose = require('mongoose');

const connectDB =async () => {
    await mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log('Connected to database');
    })
    .catch((error)=>{
        console.error(error);
    });
};

module.exports = connectDB;