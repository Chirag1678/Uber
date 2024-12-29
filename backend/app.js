const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes.js');
const captainRouter = require('./routes/captain.routes.js');
const mapsRouter = require('./routes/maps.routes.js');
const ridesRouter = require('./routes/ride.routes.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/maps", mapsRouter);
app.use("/rides", ridesRouter);

app.get("/",(req,res)=>{
    res.send("Hello, world!");
});

module.exports = app;