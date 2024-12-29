const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { body, query } = require('express-validator');
const router = express.Router();

router.post('/create', 
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
);
router.get('/get-fare',
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    authMiddleware.authUser, 
    rideController.getFare
);
router.post('/confirm',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authMiddleware.authCaptain,
    rideController.confirmRide
);
router.get('/start-ride',
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid OTP'),
    authMiddleware.authCaptain,
    rideController.startRide
);
router.post('/end-ride',
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    authMiddleware.authCaptain,
    rideController.endRide
);

module.exports = router;