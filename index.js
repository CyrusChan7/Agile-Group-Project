require('dotenv').config() // use the dotenv to store config in .env file
const express = require("express");
const passport = require("./middleware/passport");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const eventController = require("./controller/event_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");
const port = process.env.PORT || 3001;

// Session
const session = require("express-session");
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,        // Expiry
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
// End of Session code

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));   // Allows us to use req.body

app.use(ejsLayouts);    // Allow us to use ejs

app.set("view engine", "ejs"); // Set file to use ejs

// Routes start here
app.get("/events", ensureAuthenticated, eventController.list);

app.get("/events/date/:date", ensureAuthenticated, eventController.listEventOfTheDay);

app.get("/event/new", ensureAuthenticated, eventController.new);

app.get("/event/friends", ensureAuthenticated, eventController.listFriends);

app.get("/event/addFriends", ensureAuthenticated, authController.addFriends);


app.get("/event/:id", ensureAuthenticated, eventController.listOne);

app.get("/event/:id/edit", ensureAuthenticated, eventController.edit);

app.post("/event/", ensureAuthenticated, eventController.create);

app.post("/event/update/:id", ensureAuthenticated, eventController.update);

app.post("/event/delete/:id", ensureAuthenticated, eventController.delete);

app.get("/events/search?:search", ensureAuthenticated, eventController.searchBarResults);

app.get("/events/tag?:tag", ensureAuthenticated, eventController.tagFilter);

app.get("/events/importance?:importance", ensureAuthenticated, eventController.impFilter);

// Changes Calendar month
app.get("/nextMonth", eventController.nextMonth)
app.get("/resetMonth", eventController.resetMonth)
app.get("/prevMonth", eventController.prevMonth)

// Routes end here

// Start of Weather API route
app.get("/scripts/weather", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/event/scripts/weather.js"), err => console.log(err));
})
// End of Weather API route

// Register and login
app.get("/register", forwardAuthenticated, authController.register);
app.get("/login", forwardAuthenticated, (req, res) => {
    res.render("auth/login");
});
app.post("/register", authController.registerSubmit);

app.post("/login", passport.authenticate("local", {
    successRedirect: "/events",
    failureRedirect: "/login",      // Route back to /login on failed authentication
}));


// Logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
})

// Set and use port 3001

app.listen(port, function() {
    console.log(
        "Server running. Visit: localhost:3001/events in your browser 🚀"
    );
});

module.exports = app