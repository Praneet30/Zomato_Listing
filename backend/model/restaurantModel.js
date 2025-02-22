const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    id: { type: String, required: true },
    address: { type: String, required: true },
    average_cost_for_two: { type: Number, required: true },
    book_url: { type: String },
    city: { type: String, required: true },
    city_id: { type: Number },
    country_id: { type: Number },
    cuisines: { type: String },
    currency: { type: String },
    deeplink: { type: String },
    featured_image: { type: String },
    has_online_delivery: { type: Number },
    has_table_booking: { type: Number },
    is_delivering_now: { type: Number },
    locality: { type: String },
    locality_verbose: { type: String },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
    },
    menu_url: { type: String },
    name: { type: String, required: true },
    photos_url: { type: String },
    price_range: { type: Number },
    thumb: { type: String },
    url: { type: String },
    user_rating: {
        rating_text: { type: String },
        rating_color: { type: String },
        votes: { type: String },
        aggregate_rating: { type: String }
    },
    zipcode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('restaurants', restaurantSchema);
