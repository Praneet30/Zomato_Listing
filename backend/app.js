const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://praneetgopal:praneet30@cluster0.0redyfi.mongodb.net/restaurantDb", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());
app.use('/api', restaurantRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
