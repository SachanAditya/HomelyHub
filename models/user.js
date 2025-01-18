const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type : String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;


// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/listing'); // Assuming you have a Listing model

// // Route for searching listings based on city and country
// router.get('/search', async (req, res) => {
//   const { city, country } = req.query;

//   try {
//     // Search for listings that match the city and country
//     const listings = await Listing.find({
//       city: { $regex: city, $options: 'i' },  // Case-insensitive search for city
//       country: { $regex: country, $options: 'i' },  // Case-insensitive search for country
//     });

//     // Render the search results page with the filtered listings
//     res.render('listings/searchResults', { listings });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;




