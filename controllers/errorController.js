const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  // console.log(message);
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value ${err.keyValue.name}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`; // seperate errors
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // if operational, trusted errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // if code or unknown errors - dont leak error details to client
  } else {
    // Log the error
    console.log('ERROR :boom:', err);
    // Send generic error
    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // error case - cast error
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    // error case - error code 11000
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    // error case - validation error
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
};
