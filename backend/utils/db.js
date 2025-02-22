// // const mongoose = require('mongoose');
// // require('dotenv').config();

// // const connectDB = async () => {
// //     try {
// //         await mongoose.connect("mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/Zomato", {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //             // useFindAndModify: false,
// //             // useCreateIndex: true,
// //         });
// //         console.log('MongoDB connected...');
// //     } catch (err) {
// //         console.error(err.message);
// //         process.exit(1);
// //     }
// // };

// // module.exports = connectDB;
// const fs = require('fs');
// const mongoose = require('mongoose');
// const Restaurant = require('./model/restaurantModel.js');
// const dotenv = require('dotenv');
// dotenv.config();

// // Country code mapping
// const countryCodeMapping = {
//     1: 'India',
//     14: 'Australia',
//     30: 'Brazil',
//     37: 'Canada',
//     94: 'Indonesia',
//     148: 'New Zealand',
//     162: 'Philippines',
//     166: 'Qatar',
//     184: 'Singapore',
//     189: 'South Africa',
//     191: 'Sri Lanka',
//     208: 'Turkey',
//     214: 'UAE',
//     215: 'United Kingdom',
//     216: 'United States'
// };

// // File paths to read data
// const files = ['./file1.json', './file2.json', './file3.json', './file4.json', './file5.json'];
// const restaurantCollection = [];

// // Read data from files and parse JSON
// files.forEach((file) => {
//     const fileData = fs.readFileSync(file, 'utf8');
//     const parsedData = JSON.parse(fileData);

//     // Extract restaurants and add them to the collection
//     parsedData.forEach((entry) => {
//         if (entry.restaurants) {
//             entry.restaurants.forEach((restaurantEntry) => {
//                 restaurantCollection.push(restaurantEntry.restaurant);
//             });
//         }
//     });
// });
// console.log("Restaurants before cleaning data:", restaurantCollection.length);

// // Eliminate duplicate restaurants by their unique id
// const distinctRestaurants = restaurantCollection.reduce((acc, current) => {
//     const found = acc.find(item => item.id === current.id);
//     if (!found) {
//         acc.push(current);
//     }
//     return acc;
// }, []);

// // Filter out unnecessary keys from restaurant objects
// const keysToRemove = ['R', 'establishment_types', 'apikey', 'events_url', 'zomato_events', 'offers', 'switch_to_order_menu'];

// const cleanedRestaurants = distinctRestaurants.map((restaurant) => {
//     // Add country attribute based on country code
//     if (restaurant.country_code && countryCodeMapping[restaurant.country_code]) {
//         restaurant.country = countryCodeMapping[restaurant.country_code];
//     }
    
//     // Map location data
//     const { latitude, longitude, ...locationData } = restaurant.location || {};
//     restaurant.location = {
//         type: "Point",
//         coordinates: [parseFloat(longitude), parseFloat(latitude)]
//     };

//     // Remove unnecessary keys
//     keysToRemove.forEach((key) => {
//         delete restaurant[key];
//     });

//     // Add remaining location attributes to the top-level fields
//     Object.assign(restaurant, locationData);

//     return restaurant;
// });
// console.log("Restaurants after cleaning data:", cleanedRestaurants.length);

// // Function to insert cleaned data into MongoDB
// const insertData = async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect("mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/Zomato", { useNewUrlParser: true, useUnifiedTopology: true });

//         // Insert cleaned data into the 'restaurants' collection using Mongoose model
//         for (const restaurant of cleanedRestaurants) {
//             await Restaurant.updateOne(
//                 { id: restaurant.id }, 
//                 restaurant, 
//                 { upsert: true } 
//             );
//         }

//         console.log('Successfully inserted/updated data into the database.');
//     } catch (err) {
//         console.error('Failed to insert/update data:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// // Execute the data insertion
// insertData();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

// Specify paths to all JSON files
const files = [
    path.resolve(__dirname, 'file1.json'),
    path.resolve(__dirname, 'file2.json'),
    path.resolve(__dirname, 'file3.json'),
    path.resolve(__dirname, 'file4.json'),
    path.resolve(__dirname, 'file5.json')
];

// MongoDB URI
const mongoUri = process.env.MONGO_URI;

// Function to read and parse JSON files
const readAndParseFiles = (files) => {
    const restaurantCollection = [];
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            const fileData = fs.readFileSync(file, 'utf8');
            const parsedData = JSON.parse(fileData);
            console.log(`Data from ${file}:`, parsedData);
            parsedData.forEach((entry) => {
                if (entry.restaurants) {
                    entry.restaurants.forEach((restaurantEntry) => {
                        restaurantCollection.push(restaurantEntry.restaurant);
                    });
                }
            });
        } else {
            console.error(`File not found: ${file}`);
        }
    });
    return restaurantCollection;
};

// Function to clean and prepare restaurant data
const cleanRestaurants = (restaurants) => {
    const keysToRemove = ['R', 'establishment_types', 'apikey', 'events_url', 'zomato_events', 'offers', 'switch_to_order_menu'];
    return restaurants.map((restaurant) => {
        if (restaurant.country_code && countryCodeMapping[restaurant.country_code]) {
            restaurant.country = countryCodeMapping[restaurant.country_code];
        }
        
        const { latitude, longitude, ...locationData } = restaurant.location || {};
        restaurant.location = {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        };

        keysToRemove.forEach((key) => {
            delete restaurant[key];
        });

        Object.assign(restaurant, locationData);
        return restaurant;
    });
};

// Function to insert data into MongoDB
const insertData = async (cleanedRestaurants) => {
    const client = new MongoClient("mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/Zomato", {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverSelectionTimeoutMS: 30000 
    });
    
    try {
        await client.connect();
        const db = client.db('restaurantDb');
        const collection = db.collection('restaurants');

        for (const restaurant of cleanedRestaurants) {
            await collection.updateOne(
                { id: restaurant.id }, 
                { $set: restaurant }, 
                { upsert: true }
            );
        }

        console.log('Successfully inserted/updated data into the database.');
    } catch (err) {
        console.error('Failed to insert/update data:', err);
    } finally {
        await client.close();
    }
};

// Main function to execute the script
const main = async () => {
    const restaurantCollection = readAndParseFiles(files);
    console.log("Restaurants before cleaning data:", restaurantCollection.length);

    const cleanedRestaurants = cleanRestaurants(restaurantCollection);
    console.log("Restaurants after cleaning data:", cleanedRestaurants.length);

    await insertData(cleanedRestaurants);
};

// Execute the script
main();
