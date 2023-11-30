const express = require('express');
const basicRoute = express.Router();
const { getLocType, getAdsType, getBoardType, getReportType,
    login } = require('../controllers/basicController')
const { upload, uploadNone } = require('../middlewares/upload');

basicRoute.get("/getLocType", getLocType);

basicRoute.get("/getAdsType", getAdsType);

basicRoute.get("/getBoardType", getBoardType);

basicRoute.get("/getReportType", getReportType);

basicRoute.post("/login", uploadNone.none(), login);

module.exports = basicRoute;