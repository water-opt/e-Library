const express = require('express');
const router = express.Router();
const { bookData, featuredBooks } = require('../controllers/bookCont');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/data', bookData);
router.get('/featured',featuredBooks)


module.exports = router;