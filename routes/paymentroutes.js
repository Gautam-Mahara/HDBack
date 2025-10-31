const express = require('express');
const { checkAval } = require('../controllers/availCheck');
const { applyPromo } = require('../controllers/promoController');
const router = express.Router();
const {bookAdventure}=require('../controllers/bookAdventure')



// Payment controller
router.post('/check-availability',checkAval);
// router.get('/summary',)
router.post('/promo',applyPromo)
router.post('/book',bookAdventure);



module.exports = router;
