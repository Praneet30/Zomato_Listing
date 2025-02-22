const Restaurant = require('../models/restaurantModel');

exports.searchByLocation = async (req, res) => {
    const { latitude, longitude, distance = 3000 } = req.query;

    try {
        const restaurants = await Restaurant.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [longitude, latitude] },
                    $maxDistance: distance,
                },
            },
        });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
