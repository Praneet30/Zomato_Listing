const Restaurant = require('../models/Restaurant');

const updateRestaurantData = async () => {
    try {
        const restaurants = await Restaurant.find();
        restaurants.forEach(async (doc) => {
            doc.restaurants = doc.restaurants.map((restaurantObj) => {
                restaurantObj.restaurant.has_online_delivery = restaurantObj.restaurant.has_online_delivery === 1;
                restaurantObj.restaurant.is_delivering_now = restaurantObj.restaurant.is_delivering_now === 1;
                restaurantObj.restaurant.has_table_booking = restaurantObj.restaurant.has_table_booking === 1;
                return restaurantObj;
            });
            await doc.save();
        });
        console.log('Restaurants updated successfully');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = updateRestaurantData;
