const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('../models/articleModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`));

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Article.create(articles);
    console.log('data loaded successfully!');
  } catch (error) {
    console.log(error);
  }
};

// DELETE DATA FROM DB COLLECTIONS
const deleteData = async () => {
  try {
    await Article.deleteMany();
    console.log('data deleted successfully!');
  } catch (error) {
    console.log(error);
  }
};

// console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
