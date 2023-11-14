const express = require('express');
const quanRoute = express.Router();
const { getAdsLoc, getReport, getReportType } = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');

quanRoute.get("/getAdsLoc", getAdsLoc);

quanRoute.get("/getReport/:email", getReport);

quanRoute.get("/getReportType", getReportType);

module.exports = quanRoute;