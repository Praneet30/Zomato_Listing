// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const Restaurant = require('../model/restaurantModel');

// require('dotenv').config();

// const mongoUri = "mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/Zomato";

// const loadData = async () => {
//     await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

//     try {
//         const files = ['file1.json', 'file2.json', 'file3.json', 'file4.json', 'file5.json'];
//         for (const file of files) {
//             const filePath = path.resolve(__dirname, `../data/${file}`);
//             const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//             await Restaurant.insertMany(data);
//             console.log(`Data from ${file} inserted successfully.`);
//         }
//     } catch (err) {
//         console.error('Error loading data:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// };

// loadData();

// Assuming you are using Mongoose
const mongoose = require('mongoose');
const Restaurant = require('../model/restaurantModel'); // Adjust path as needed

async function createIndex() {
    try {
        await mongoose.connect('mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/Zomato', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            serverSelectionTimeoutMS: 30000 // 30 seconds
        });
        
        await Restaurant.collection.createIndex({ location: '2dsphere' });
        console.log('2dsphere index created successfully.');

        await mongoose.disconnect(); // Disconnect after creating the index
        console.log('Disconnected from MongoDB.');
    } catch (err) {
        console.error('Error creating 2dsphere index:', err);
    }
}

createIndex();

