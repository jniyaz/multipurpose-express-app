const express = require('express');
const { getWpArticles } = require('../controllers/articleController');

const router = express.Router();

// router.route('/').get();

router.route('/get-wp-articles-write').get(getWpArticles);

module.exports = router;
