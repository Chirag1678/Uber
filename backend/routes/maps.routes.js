const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const mapController = require('../controllers/maps.controller.js');
const { query } = require('express-validator');
const router = express.Router();

router.get('/get-coordinates', query('address').isString().isLength({min:3}), authMiddleware.authUser, mapController.getCoordinates);
router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
);
router.get('/get-suggestions', 
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getSuggestions
);

module.exports = router;