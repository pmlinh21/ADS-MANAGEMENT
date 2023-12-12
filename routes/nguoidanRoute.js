const express = require('express');
const nguoidanRoute = express.Router();
const { getAdsLoc, getReport, getAdsReportNgDan } = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');
const { getAdsReport } = require('../controllers/quanController');

nguoidanRoute.get("/getAdsLoc", getAdsLoc);

nguoidanRoute.get("/getAdsReport", getAdsReportNgDan)

nguoidanRoute.get("/getReport/:email", getReport);

module.exports = nguoidanRoute;