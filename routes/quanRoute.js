const express = require('express');
const quanRoute = express.Router();
const { 
    getAllAdsLoc, getMapInfo, getWard, 
    getAdsLocation, getAds, updateAdsLoc, updateAds,
    getAdsLocReport, getAdsReport, getLocReport,
    getAdsCreate, adsCreate, getCanBoPhuong, getMapAdsLoc } = require('../controllers/quanController')
const { upload } = require('../middlewares/upload');

const cookieParser = require("cookie-parser");
quanRoute.use(cookieParser(process.env.JWT_SECRET_KEY))
const { isCanboQuan } = require('../middlewares/baseToken');

quanRoute.get("/getAllAdsLoc", isCanboQuan, getAllAdsLoc)

// quanRoute.put("/updateInfo/:id_district", isCanboQuan, updateInfo);

quanRoute.get("/getWard/:id_district", isCanboQuan, getWard);

quanRoute.get("/getMapInfo/:id_district", isCanboQuan, getMapInfo);

quanRoute.get("/getAdsLocation/:id_district", isCanboQuan, getAdsLocation);

quanRoute.post("/updateAdsLoc/:email", isCanboQuan, upload('updateAdsLoc').single("file"), updateAdsLoc);

quanRoute.get("/getAds/:id_district", isCanboQuan, getAds);

quanRoute.post("/updateAds/:email", isCanboQuan, upload('updateAds').single("file"), updateAds);

quanRoute.get("/getAdsLocReport/:id_district", isCanboQuan, getAdsLocReport);

quanRoute.get("/getAdsReport/:id_district", isCanboQuan, getAdsReport);

quanRoute.get("/getLocReport/:id_district", isCanboQuan, getLocReport);

quanRoute.get("/getAdsCreate/:id_district", isCanboQuan, getAdsCreate);

quanRoute.post("/adsCreate/:id_district", isCanboQuan, upload('adsCreate').single("file"), adsCreate)

quanRoute.get("/getCanBoPhuong", getCanBoPhuong);

quanRoute.get("/getMapAdsLoc/:id_ward", getMapAdsLoc);

module.exports = quanRoute;