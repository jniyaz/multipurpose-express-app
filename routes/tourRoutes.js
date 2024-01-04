const express = require("express");

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

router.route("/").get(getAllUsers);

module.exports = router;
