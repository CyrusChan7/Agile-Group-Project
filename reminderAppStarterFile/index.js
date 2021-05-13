require('dotenv').config() // use the dotenv to store config in .env file
const express = require("express");
const passport = require("./middleware/passport");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");

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
app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminders/:date", ensureAuthenticated, reminderController.listEventOfTheDay);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/friends", ensureAuthenticated, reminderController.listFriends);

app.get("/reminder/addFriends", ensureAuthenticated, authController.addFriends);


app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

app.get("/reminders/search?:search", ensureAuthenticated, reminderController.searchBarResults);

// Changes Calendar month
app.get("/nextMonth", reminderController.nextMonth)
app.get("/resetMonth", reminderController.resetMonth)
app.get("/prevMonth", reminderController.prevMonth)

// Routes end here

// Start of Weather API route
app.get("/scripts/weather", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/reminder/scripts/weather.js"), err => console.log(err));
})
// End of Weather API route

// Register and login
app.get("/register", forwardAuthenticated, authController.register);
app.get("/login", forwardAuthenticated, (req, res) => {
    res.render("auth/login");
});
app.post("/register", authController.registerSubmit);

app.post("/login", passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",      // Route back to /login on failed authentication
}));


// Logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
})

// Set and use port 3001
app.listen(3001, function() {
    console.log(
        "Server running. Visit: localhost:3001/reminders in your browser 🚀"
    );
});

module.exports = app