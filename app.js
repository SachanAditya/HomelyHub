if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');   // store data in mongoDB 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL; 

main() 
    .then(() => {
        console.log("connected to Database(MongoDB)");
    }).catch((err) => {
        console.log(err);
    });
// connect to the database(create async function)
async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24*3600,
// });

//  store.on("error", () => {
//    console.log("Error in MONGO SESSION STORE" , err); 
   
//  });

const sessionOptions = {
    // store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: { 
        expires : Date.now() + 7*24*60*60*1000,
        maxAge :  7*24*60*60*1000,
        httpOnly : true,
    },
};

// app.get("/", (req,res) => {
//     res.send("Hi , I am root");
// })



app.use(session(sessionOptions));
app.use(flash());

// passport middleware

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// MiddleWare Image to url
app.use((req, res, next) => {
    if (req.body.listing) {
        // Convert `listing.image.url` to `listing.image`
        if (req.body.listing['image.url'] !== undefined) {
            req.body.listing.image = { url: req.body.listing['image.url'] };
            delete req.body.listing['image.url'];
        }

        // Provide a default image if none exists
        if (!req.body.listing.image || !req.body.listing.image.url) {
            req.body.listing.image = {
                url: "https://example.com/default-image.jpg"
            };
        }
    }
    next();
});

// listing Route
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews); 
app.use("/" , userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page Not Found"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    console.log(err);
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});
app.listen(8080, (req,res) => {
    console.log("server is listening to the port 8080");
});