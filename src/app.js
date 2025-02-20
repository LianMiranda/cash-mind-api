const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connection = require("./config/database/connection");
const User = require("./api/models/User");
const Transaction = require("./api/models/Transaction");
const associations = require('./config/database/associations');
const app = express();
const env = require('./config/env/env');
//routes
const userRoutes = require("./api/routes/user.routes");
const authRoutes = require("./api/routes/auth.routes")
const transactionRoutes = require("./api/routes/transaction.routes")

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: env.secret, 
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRoutes, authRoutes, transactionRoutes);

app.get('/', (req, res) => {
    res.send("🚀 Api rodando, Olá "+ req.user.firstName + " " + req.user.lastName );
});

app.get('/error', (req, res) => {
    res.send(`<div><h1 style="color: red">Erro ao fazer login com google!</h1></div>`)
});

app.get('/logout', (req, res) => {
    req.logout(()=> {});
    res.redirect('/');
});

module.exports = app
