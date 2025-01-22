const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const { populate } = require("../models/user.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router
    .route("/")
    .get(wrapAsync(listingController.index))
        .post(
        isLoggedIn,   
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.createForm)
         );

router
    .route("/new")
    .get(isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showForm))
    .put(isLoggedIn, isOwner, upload.single("listing[image]") ,validateListing, wrapAsync(listingController.updateForm))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


router
    .route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(listingController.editForm));


    // router.get("/search", wrapAsync(async (req, res) => {
    //     const { location, place } = req.query;
    
    //     const query = {};
    //     if (location) query.location = new RegExp(location, "i");
    //     if (place) query.place = new RegExp(place, "i");
    
    //     const listings = await Listing.find(query);
    //     res.render("listings/searchResults.ejs", { listings, location, place });
    // }));

module.exports = router;
