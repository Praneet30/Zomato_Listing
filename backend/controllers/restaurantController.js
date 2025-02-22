const Restaurant = require('../model/restaurantModel');

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ id: req.params.id });
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get list of restaurants with pagination
exports.getRestaurantsList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const restaurants = await Restaurant.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(restaurants);
      
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Search by location
exports.searchByLocation = async (req, res) => {
    const { latitude, longitude, distance = 3000 } = req.query;

    try {
        // Parse and validate latitude and longitude
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const maxDistance = parseInt(distance, 10);

        if (isNaN(lat) || isNaN(lon) || isNaN(maxDistance)) {
            return res.status(400).json({ error: 'Invalid latitude, longitude, or distance.' });
        }

        console.log(`Searching for restaurants near (${lat}, ${lon}) within ${maxDistance} meters`);

        // Perform the geospatial query using aggregation
        const restaurants = await Restaurant.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [lon, lat] },
                    distanceField: 'dist.calculated',
                    maxDistance: maxDistance,
                    spherical: true,
                    query: { location: { $exists: true } } // Ensure the field exists
                }
            }
        ]);

        console.log("restaurants", restaurants);
        res.json(restaurants);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.searchByName = async (req, res) => {
    const { name } = req.query;

    try {
        if (!name) {
            return res.status(400).json({ error: 'Name query parameter is required.' });
        }

        const restaurants = await Restaurant.find({
            name: { $regex: new RegExp(name, 'i') } 
        });

        if (restaurants.length === 0) {
            return res.status(404).json({ message: 'No restaurants found with that name.' });
        }

        res.json(restaurants);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};