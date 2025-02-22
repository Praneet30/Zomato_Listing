const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Get restaurant by ID
router.get('/restaurant/:id', restaurantController.getRestaurantById);

// Get list of restaurants with pagination
router.get('/restaurants', restaurantController.getRestaurantsList);

// Search by location
router.get('/restaurants/search/location', restaurantController.searchByLocation);
router.get('/restaurants/search/name', restaurantController.searchByName);



module.exports = router;
