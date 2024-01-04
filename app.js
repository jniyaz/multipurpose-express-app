const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");

const app = express();

// 1. middleware
if (process.env.NODEENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from middleware... 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. routes

// test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// tours
app.use("/api/v1/tours", tourRoutes);

module.exports = app;
