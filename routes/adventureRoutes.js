const express = require('express');
const router = express.Router();
const { getAdventures, uploadAdventure } = require('../controllers/adventureController');
const { detail } = require('../controllers/detail');
const multer = require('multer');
const { searchQuery } = require('../controllers/searchController');

// Routes
router.get('/', getAdventures);
// router.post('/', upload.single('image'), uploadAdventure);
router.get("/search", searchQuery);
router.get('/:id', detail); // ✅ corrected

module.exports = router;
