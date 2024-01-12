const mongoose = require('mongoose');

const articleScehema = new mongoose.Schema(
  {
    wp_article_id: {
      type: Number,
      required: [true, 'an article should have wp_article_id'],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['publish', 'draft', 'archive'],
        message: 'status is either: publish, draft, archive',
      },
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    wp_author_id: {
      type: Number,
      required: [true, 'an article should have wp_author_id'],
    },
    categories: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    link: {
      type: String,
      default: null,
    },
    shortlink: {
      type: String,
      default: null,
    },
    created_date: {
      type: Date,
      default: null,
    },
    modified_date: {
      type: Date,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Article = mongoose.model('Article', articleScehema);

module.exports = Article;
