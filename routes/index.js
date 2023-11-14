const express = require('express');
const rootRoute = express.Router();
const basicRoute = require('./basicRoute');
const quanRoute = require('./quanRoute');
const nguoidanRoute = require('./nguoidanRoute');

rootRoute.use("/basic", basicRoute);
rootRoute.use("/quan", quanRoute);
rootRoute.use("/nguoidan", nguoidanRoute);


module.exports = rootRoute;