require("dotenv").config();
const express = require('express');
const connection = require("./config/database/connection");
const userRoutes = require("./api/routes/user.routes");
const User = require("./api/models/User");
const Transaction = require("./api/models/Transaction");
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("🚀 API rodando!");
});

module.exports = app
