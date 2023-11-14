const express = require('express');
const basicRoute = express.Router();
const { getLocType, getAdsType, getBoardType, getReportType } = require('../controllers/basicController')
const { upload } = require('../middlewares/upload');

basicRoute.get("/getLocType", getLocType);

basicRoute.get("/getAdsType", getAdsType);

basicRoute.get("/getBoardType", getBoardType);

basicRoute.get("/getReportType", getReportType);

module.exports = basicRoute;