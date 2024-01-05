const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.validateRequest = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or price",
    });
  }
  next();
};

// GET TOURS
exports.getTours = (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      total: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

// GET TOUR
exports.getTour = (req, res) => {
  try {
    const id = req.params.id * 1;
    const tour = tours.find((item) => item.id === id);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }

  // res.status(500).json({
  //   status: "error",
  //   message: "This route is not yet defined",
  // });
};

// CREATE
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (error) =>
    res.status(201).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        tour: newTour,
      },
    })
  );
};

// UPDATE
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: "Updated tour here...",
    },
  });
};

// DELETE
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
