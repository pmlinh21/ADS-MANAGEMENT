const express = require('express');
const basicRoute = express.Router();
const { getLocType, getAdsType, getBoardType, getReportType,
    getAdsReportByID, getAdsLocReportByID, getLocReportByID,
    updateAdsReportByID, updateAdsLocReportByID, updateLocReportByID,
    getAdsCreateByID, deleteAdsCreateByID,
    login, updatePassword } = require('../controllers/basicController')
const { uploadNone } = require('../middlewares/upload');

const cookieParser = require("cookie-parser");
basicRoute.use(cookieParser(process.env.JWT_SECRET_KEY))
const { verifyToken } = require('../middlewares/baseToken');

basicRoute.get("/getLocType", verifyToken, getLocType);

basicRoute.get("/getAdsType", verifyToken, getAdsType);

basicRoute.get("/getBoardType", verifyToken, getBoardType);

basicRoute.get("/getReportType", verifyToken, getReportType);

basicRoute.get("/updatePwd/:email", verifyToken, updatePassword);

basicRoute.get("/getAdsReportByID/:id_report", verifyToken, getAdsReportByID);

basicRoute.get("/getAdsLocReportByID/:id_report", verifyToken, getAdsLocReportByID);

basicRoute.get("/getLocReportByID/:id_report", verifyToken, getLocReportByID);

basicRoute.put("/updateAdsReportByID/:id_report", verifyToken, updateAdsReportByID);

basicRoute.put("/updateAdsLocReportByID/:id_report", verifyToken, updateAdsLocReportByID);

basicRoute.put("/updateLocReportByID/:id_report", verifyToken, updateLocReportByID);

basicRoute.get("/getAdsCreateByID/:id_create", verifyToken, getAdsCreateByID);

basicRoute.delete("/deleteAdsCreateByID/:id_create", verifyToken, deleteAdsCreateByID);

// basicRoute.get("/isLoggedIn", isLoggedIn);

basicRoute.post("/login", uploadNone.none(), login);


// basicRoute.get("/login-success/:email/:role/:id", basic.loginSuccess)

module.exports = basicRoute;