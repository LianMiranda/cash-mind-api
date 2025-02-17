const express = require('express');
const connection = require("./config/database/connection");
const userRoutes = require("./api/routes/user.routes");
const User = require("./api/models/User");
const Transaction = require("./api/models/Transaction");
const app = express();
const passport = require('passport');
const env = require('./config/env/env');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: env.secret, 
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoutes);

module.exports = app
