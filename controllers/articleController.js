const fs = require('fs');
const Article = require('../models/articleModel');

// GET ARTICLES
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      status: 'success',
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error,
    });
  }
};

// GET ARTICLE
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'No article found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error,
    });
  }
};

// fetch wp articles and write to article json file
exports.fetchWpArticles = async (req, res, next) => {
  try {
    console.log(`${process.env.WP_API_BASE}/posts`);
    const response = await fetch(`${process.env.WP_API_BASE}/posts`);
    const jsonData = await response.json();

    const desiredData = [];

    jsonData.forEach((item) => {
      desiredData.push({
        wp_article_id: item.id,
        status: item.status,
        title: item.title.rendered,
        slug: item.slug,
        content: item.content.rendered,
        excerpt: item.excerpt.rendered,
        wp_author_id: item.author,
        categories: item.categories,
        tags: item.tags,
        link: item.link,
        shortlink: item.jetpack_shortlink,
        created_date: item.date,
        modified_date: item.modified,
      });
    });

    // Write the JSON data to a file
    await fs.writeFileSync(
      `${__dirname}/../data/articles.json`,
      JSON.stringify(desiredData, null, 2),
    ); // Indent for readability

    res.send('JSON fetched and written to articles.json');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or writing JSON');
  }
};
