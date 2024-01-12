const fs = require('fs');

// fetch wp articles and write to article json file
exports.getWpArticles = async (req, res, next) => {
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
