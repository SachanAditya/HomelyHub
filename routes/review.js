const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


// // show Incoming Data
// router.use((req, res, next) => {
//   console.log("Request Body:", req.body);
//   console.log("Request Params:", req.params);
//   next();
// });

const reviewController = require("../controllers/reviews.js");

// Post Review Route
router
  .route("/")
  .post(isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review route

router.route("/:reviewId")
  .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;



