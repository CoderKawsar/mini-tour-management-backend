const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

router.route("/seed-db/:noOfTour").post(tourController.seedTourDatabase);
router.route("/delete-all-tours").delete(tourController.deleteAllTours);

router.route("/trending").get(tourController.trendingTours);
router.route("/cheapest").get(tourController.cheapestTours);

router.route("/").get(tourController.getAllTours).post(tourController.postTour);

router
  .route("/:id")
  .get(tourController.getATourById)
  .patch(tourController.updateATour)
  .delete(tourController.deleteATour);

module.exports = router;
