const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/tourModel');

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data loaded successfully!');
  } catch (error) {
    console.log(error);
  }
};

// DELETE DATA FROM DB COLLECTIONS
const deleteData = async () => {
  try {
    await Tour.deleteMany();
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
