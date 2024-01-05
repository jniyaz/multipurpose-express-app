const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");

const app = express();

// 1. MIDDLEWARES
if (process.env.NODEENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hi from middleware... 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTES
app.use("/api/v1/tours", tourRoutes);

module.exports = app;
