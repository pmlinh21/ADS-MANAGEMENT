const express = require('express');
const rootRoute = express.Router();
const quanRoute = require('./quanRoute');
const nguoidanRoute = require('./nguoidanRoute');

rootRoute.use("/quan", quanRoute);
rootRoute.use("/nguoidan", nguoidanRoute);


module.exports = rootRoute;