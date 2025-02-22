const { imageRecognitionService } = require('../services/imageRecognitionService');
const Restaurant = require('../models/restaurantModel');

exports.searchByImage = async (req, res) => {
    try {
        const cuisine = await imageRecognitionService(req.file);
        const restaurants = await Restaurant.find({ cuisines: new RegExp(cuisine, 'i') });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
