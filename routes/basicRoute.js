const express = require('express');
const basicRoute = express.Router();
const { getLocType, getAdsType, getBoardType, getReportType,
    getAdsReportByID, getAdsLocReportByID, getLocReportByID,
    updateAdsReportByID, updateAdsLocReportByID, updateLocReportByID,
    login, updatePassword } = require('../controllers/basicController')
const { upload, uploadNone } = require('../middlewares/upload');

basicRoute.get("/getLocType", getLocType);

basicRoute.get("/getAdsType", getAdsType);

basicRoute.get("/getBoardType", getBoardType);

basicRoute.get("/getReportType", getReportType);

basicRoute.get("/updatePwd/:email", updatePassword);

basicRoute.get("/getAdsReportByID/:id_report", getAdsReportByID);

basicRoute.get("/getAdsLocReportByID/:id_report", getAdsLocReportByID);

basicRoute.get("/getLocReportByID/:id_report", getLocReportByID);

basicRoute.put("/updateAdsReportByID/:id_report", updateAdsReportByID);

basicRoute.put("/updateAdsLocReportByID/:id_report", updateAdsLocReportByID);

basicRoute.put("/updateLocReportByID/:id_report", updateLocReportByID);

basicRoute.post("/login", uploadNone.none(), login);

module.exports = basicRoute;