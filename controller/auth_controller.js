let database = require("../database");
let update = require("../database").writeJSON;

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        // Check if user's email exists in database
        let match = 0;
        database.Database.forEach(user => {
            if (user.email === req.query.email) {
                console.log("Duplicate user email")
                match = 1;
            }
        });
        if (match == 1) {
            // res.render("auth/login");
            res.redirect("/");
        } else {
            res.render("auth/register", {
                email: req.query.email,
            });
        }
    },

    registerSubmit: (req, res) => {
        // Adding new user to database
        const newUser = {     // Structure for the newly created user
            id: database.Database.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            events: [],
            avatar: "",
        };
        // Fetch avatar for new user
        newUser.avatar = `https://avatars.abstractapi.com/v1/?api_key=${process.env.Abstractapi_CLIENT_ID}&name=${encodeURIComponent(newUser.name)}&image_size=60&char_limit=2&background_color=335eea&font_color=ffffff&is_rounded=true&is_uppercase=true`

        database.Database.push(newUser);
        update()
        res.render("auth/login");
    },
};

module.exports = authController;