const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post("/register",[
    body('email').isEmail().isLength({min:5}).withMessage("Invalid email address"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
], 
    captainController.registerCaptain
);
router.post("/login",[
    body('email').isEmail().isLength({min:5}).withMessage('Invalid email address'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long')
],
    captainController.loginCaptain
);
router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;