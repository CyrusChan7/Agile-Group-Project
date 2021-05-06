let database = require("../database");
const express = require("express");
const { getUserByEmailIdAndPassword } = require("./userController");
const path = require("path");
const { default: fetch } = require("node-fetch");
const { calendarData } = require("../views/reminder/scripts/calendar")


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
            reminders: [],
            avatar: "",
            friends: { friendID: [] }
        };
        // Fetch avatar for new user
        newUser.avatar = `https://avatars.abstractapi.com/v1/?api_key=${process.env.Abstractapi_CLIENT_ID}&name=${encodeURIComponent(newUser.name)}&image_size=60&char_limit=2&background_color=335eea&font_color=ffffff&is_rounded=true&is_uppercase=true`

        database.Database.push(newUser);
        console.log("Registration completed!");
        res.render("auth/login");

    },

    addFriends: (req, res) => {
        // console.log(req.query);

        // Add the friends in the database of that user's record
        if (req.query.friendID) {
            if (Array.isArray(req.query.friendID)) {
                req.query.friendID.forEach((ID) => {
                    if (!(req.user.friends.friendID.includes(ID))) {
                        req.user.friends.friendID.push(ID)
                    }
                })
            } else {
                if (!(req.user.friends.friendID.includes(req.query.friendID))) {
                    req.user.friends.friendID.push(req.query.friendID)
                }
            }
        }

        // console.log(req.user)

        res.render("reminder/index", {
            user: req.user,
            reminders: req.user.reminders,
            database: database.Database,
            friendIDs: req.user.friends.friendID,
            calendarData,
        });
    }
};

module.exports = authController;