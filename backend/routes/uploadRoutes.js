const express = require('express');
const { searchByImage } = require('../controllers/uploadController');
const { imageUploader } = require('../utils/imageUploader');
const router = express.Router();

router.post('/search/image', imageUploader.single('image'), searchByImage);

module.exports = router;
