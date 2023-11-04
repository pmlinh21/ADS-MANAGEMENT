const express = require('express');
const rootRoute = express.Router();
const quanRoute = require('./quanRoute');

rootRoute.use("/quan", quanRoute);


module.exports = rootRoute;