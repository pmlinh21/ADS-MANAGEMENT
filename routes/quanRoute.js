const express = require('express');
const quanRoute = express.Router();
const {
    getAllAdsLoc, getMapInfo,
    getInfo, getWard, updateInfo, updatePassword, forgetPassword,
    getAdsLocation, getAds, updateAdsLoc, updateAds,
    getAdsLocReport, getAdsReport, getLocReport,
    updateAdsLocReport, updateAdsReport, updateLocReport,
    getAdsCreate, adsCreate, deleteAdsCreate } = require('../controllers/quanController')
const { upload } = require('../middlewares/upload');

const cookieParser = require("cookie-parser");
quanRoute.use(cookieParser(process.env.JWT_SECRET_KEY))
const { isCanboQuan } = require('../middlewares/baseToken');

quanRoute.get("/getAllAdsLoc", isCanboQuan, getAllAdsLoc)

quanRoute.put("/updateInfo/:id_district", isCanboQuan, updateInfo);

// quanRoute.put("/updatePassword/:id_district", isCanboQuan, updatePassword);

// quanRoute.put("/forgetPassword/:id_district", isCanboQuan, forgetPassword);

quanRoute.get("/getWard/:id_district", isCanboQuan, getWard);

quanRoute.get("/getMapInfo/:id_district", isCanboQuan, getMapInfo);

quanRoute.get("/getAdsLocation/:id_district", isCanboQuan, getAdsLocation);

quanRoute.post("/updateAdsLoc/:email", upload('updateAdsLoc').single("file"), updateAdsLoc);

quanRoute.get("/getAds/:id_district", isCanboQuan, getAds);

quanRoute.post("/updateAds/:email", upload('updateAds').single("file"), updateAds);

quanRoute.get("/getAdsLocReport/:id_district", isCanboQuan, getAdsLocReport);

quanRoute.put("/updateAdsLocReport/:id_req", updateAdsLocReport);

quanRoute.get("/getAdsReport/:id_district", isCanboQuan, getAdsReport);

quanRoute.put("/updateAdsReport/:id_req", updateAdsReport);

quanRoute.get("/getLocReport/:id_district", isCanboQuan, getLocReport);

quanRoute.put("/updateLocReport/:id_req", updateLocReport);

quanRoute.get("/getAdsCreate/:id_district", isCanboQuan, getAdsCreate);

quanRoute.post("/adsCreate/:id_district", upload('adsCreate').single("file"), adsCreate)

quanRoute.put("/deleteAdsCreate/:id_district", isCanboQuan, deleteAdsCreate)

module.exports = quanRoute;