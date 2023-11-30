const express = require('express');
const basicRoute = express.Router();
const { getLocType, getAdsType, getBoardType, getReportType,
    login, updatePassword } = require('../controllers/basicController')
const { upload, uploadNone } = require('../middlewares/upload');

basicRoute.get("/getLocType", getLocType);

basicRoute.get("/getAdsType", getAdsType);

basicRoute.get("/getBoardType", getBoardType);

basicRoute.get("/getReportType", getReportType);

basicRoute.get("/updatePwd/:email", updatePassword);

basicRoute.post("/login", uploadNone.none(), login);

module.exports = basicRoute;