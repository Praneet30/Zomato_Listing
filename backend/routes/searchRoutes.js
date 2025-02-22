const express = require('express');
const { searchByLocation } = require('../controllers/searchController');
const router = express.Router();

router.get('/search/location', searchByLocation);

module.exports = router;
