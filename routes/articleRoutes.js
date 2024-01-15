const express = require('express');
const {
  getArticles,
  getArticle,
  fetchWpArticles,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles);

router.route('/:id').get(getArticle);

router.route('/get-wp-articles-write').get(fetchWpArticles);

module.exports = router;
