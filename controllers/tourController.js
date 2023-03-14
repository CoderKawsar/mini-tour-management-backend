const Tour = require("../models/Tour");
const {
  seedToursDatabaseService,
  getAllToursService,
  postTourService,
  getATourByIdService,
  deleteAllToursService,
  updateATourService,
  getTrendingToursService,
  getCheapestToursService,
  deleteATourService,
} = require("../services/tourService");

module.exports.getAllTours = async (req, res) => {
  let { fields, sort, limit, page } = req.query;

  let filters = { ...req.query };
  const excludeFields = ["limit", "page", "sort"];
  excludeFields.forEach((field) => {
    delete filters[field];
  });

  const queries = {};
  if (fields) {
    fields = fields.split(",").join(" ");
    queries.fields = fields;
    delete filters["fields"];
  }

  let filterString = JSON.stringify(filters);
  filterString = filterString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  filters = JSON.parse(filterString);

  if (sort) {
    const sortBy = sort.split(",").join(" ");
    queries.sortBy = sortBy;
  }

  if (limit) {
    queries.limit = parseInt(limit);
  } else {
    queries.limit = 10;
  }

  if (page) {
    queries.page = parseInt(page);
  } else {
    queries.page = 1;
  }

  try {
    const result = await getAllToursService(filters, queries);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get tours",
      error: error.message,
    });
  }
};

module.exports.postTour = async (req, res) => {
  try {
    const result = await postTourService(req.body);
    res.status(200).json({
      status: "success",
      message: "Tour added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't add a tour",
      error: error.message,
    });
  }
};

module.exports.getATourById = async (req, res) => {
  try {
    const result = await getATourByIdService(req.params.id);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't find the tour",
      error: error.message,
    });
  }
};

module.exports.updateATour = async (req, res) => {
  try {
    const result = await updateATourService(req.params.id, req.body);
    if (result.modifiedCount) {
      res.status(200).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the tour",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the tour",
      error: error.message,
    });
  }
};

module.exports.deleteATour = async (req, res) => {
  try {
    const result = await deleteATourService(req.params.id);
    if (result.deletedCount) {
      res.status(200).json({
        status: "success",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "No tour deleted",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the tour",
      error: error.message,
    });
  }
};

module.exports.trendingTours = async (req, res) => {
  try {
    const result = await getTrendingToursService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't find trending tours",
      error: error.message,
    });
  }
};

module.exports.cheapestTours = async (req, res) => {
  try {
    const result = await getCheapestToursService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't find cheapest tours",
      error: error.message,
    });
  }
};

module.exports.seedTourDatabase = async (req, res) => {
  try {
    const result = await seedToursDatabaseService(req.params.noOfTour);
    res.status(200).json({
      status: "success",
      message: "Database seeded successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't seed tour database",
      error: error.message,
    });
  }
};

module.exports.deleteAllTours = async (req, res) => {
  try {
    const result = await deleteAllToursService();
    res.status(200).json({
      status: "success",
      message: "All Tours Deleted Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Tours couldn't be deleted",
      error: error.message,
    });
  }
};
