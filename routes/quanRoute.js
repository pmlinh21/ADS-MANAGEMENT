const express = require('express');
const quanRoute = express.Router();
const { 
    getAllAdsLoc, getMapInfo, getWard, 
    getAdsLocation, getAds, updateAdsLoc, updateAds,
    getAdsLocReport, getAdsReport, getLocReport,
    getAdsCreate, createAds, extendAds,
    getCanBoPhuong, getMapAdsLoc, getAdsWard, getAdsLocationWard,
    getAdsReportWard, getAdsLocReportWard, getLocReportWard,
    getAdsCreateWard, createAdsWard, getWardAndDistrict, getDistrictByID } = require('../controllers/quanController')
const { upload } = require('../middlewares/upload');

const cookieParser = require("cookie-parser");
quanRoute.use(cookieParser(process.env.JWT_SECRET_KEY))
const { isCanboQuan, isCanboPhuong, isCanboPhuongOrQuan } = require('../middlewares/baseToken');

quanRoute.get("/getAllAdsLoc", isCanboPhuongOrQuan, getAllAdsLoc)

// quanRoute.put("/updateInfo/:id_district", isCanboQuan, updateInfo);

quanRoute.get("/getWard/:id_district", isCanboQuan, getWard);

quanRoute.get("/getMapInfo/:id_district", isCanboQuan, getMapInfo);

quanRoute.get("/getAdsLocation/:id_district", isCanboQuan, getAdsLocation);

quanRoute.post("/updateAdsLoc/:email", isCanboPhuongOrQuan, upload('updateAdsLoc').single("file"), updateAdsLoc);

quanRoute.get("/getAds/:id_district", isCanboQuan, getAds);

quanRoute.post("/updateAds/:email", isCanboPhuongOrQuan, upload('updateAds').single("file"), updateAds);

quanRoute.get("/getAdsLocReport/:id_district", isCanboQuan, getAdsLocReport);

quanRoute.get("/getAdsReport/:id_district", isCanboQuan, getAdsReport);

quanRoute.get("/getLocReport/:id_district", isCanboQuan, getLocReport);

quanRoute.get("/getAdsCreate/:id_district", isCanboQuan, getAdsCreate);

quanRoute.post("/createAds", isCanboQuan, createAds)

quanRoute.post("/extendAds", isCanboPhuongOrQuan, extendAds)



quanRoute.get("/getCanBoPhuong", isCanboPhuong, getCanBoPhuong);

quanRoute.get("/getMapAdsLoc/:id_ward", isCanboPhuong, getMapAdsLoc);

quanRoute.get("/getAdsWard/:id_ward", isCanboPhuong, getAdsWard);

quanRoute.get("/getAdsLocationWard/:id_ward", isCanboPhuong, getAdsLocationWard);

quanRoute.get("/getAdsReportWard/:id_ward", isCanboPhuong, getAdsReportWard);

quanRoute.get("/getAdsLocReportWard/:id_ward", isCanboPhuong, getAdsLocReportWard);

quanRoute.get("/getLocReportWard/:id_ward", isCanboPhuong, getLocReportWard);

quanRoute.get("/getAdsCreateWard/:id_ward", isCanboPhuong, getAdsCreateWard);

quanRoute.post("/createAdsWard", isCanboPhuong, upload('createAdsWard').single("file"), createAdsWard);

quanRoute.get("/getWardAndDistrict/:id_ward", isCanboPhuong, getWardAndDistrict);

quanRoute.get("/getDistrictByID/:id_district", isCanboQuan, getDistrictByID);

module.exports = quanRoute;