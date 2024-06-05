const express = require('express');
const router = express.Router();
const { bookData } = require('../controllers/bookCont');

router.get('/data', bookData);


module.exports = router;