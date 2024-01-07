const mongoose = require('mongoose');
const slugify = require('slugify');

const tourScehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour should have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'a tour should have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'a tour should have a description'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'a tour should have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour should have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour should have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      required: [true, 'a tour should have a cover image'],
    },
    images: [String],
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    updatedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourScehema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// handle DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourScehema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourScehema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// handle QUERY MIDDLEWARE:
// tourScehema.pre('find', function (next) {
tourScehema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourScehema.post(/^find/, function (docs, next) {
  // console.log(docs);
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// handle AGGREGATION MIDDLEWARE:
tourScehema.pre('aggregate', function (next) {
  // console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourScehema);

module.exports = Tour;
