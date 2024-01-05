const express = require("express");
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  validateRequest
} = require("../controllers/tourController");

const router = express.Router();

router
  .route("/")
  .get(getTours)
  .post(validateRequest, createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
