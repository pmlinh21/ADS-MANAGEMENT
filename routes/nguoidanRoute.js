const express = require('express');
const nguoidanRoute = express.Router();
const { getAdsLoc, getReport } = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');

nguoidanRoute.get("/getAdsLoc", getAdsLoc);

nguoidanRoute.get("/getReport/:email", getReport);

module.exports = nguoidanRoute;