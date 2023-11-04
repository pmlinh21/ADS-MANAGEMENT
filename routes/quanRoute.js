const express = require('express');
const quanRoute = express.Router();
const { getLocType, getAdsType, getBoardType,
    getInfo, getWard,
    getAdsLocation, getAds, 
    getAdsLocReport, getAdsReport, getLocReport } = require('../controllers/quanController')
const { upload } = require('../middlewares/upload');

quanRoute.get("/getLocType", getLocType);

quanRoute.get("/getAdsType", getAdsType);

quanRoute.get("/getBoardType", getBoardType);

quanRoute.get("/getInfo/:email", getInfo);

// quanRoute.put("/updateInfo/:id_district", updateInfo);

// quanRoute.put("/updatePassword/:id_district", updatePassword);

// quanRoute.put("/forgetPassword/:id_district", forgetPassword);

quanRoute.get("/getWard/:id_district", getWard);

quanRoute.get("/getAdsLocation/:id_district", getAdsLocation);

// quanRoute.post("/updateAdsLoc/:id_district", updateAdsLoc, upload('updateAdsLoc').single("file"));

quanRoute.get("/getAds/:id_district", getAds);

// quanRoute.post("/updateAds/:id_district", updateAds, upload('updateAds').single("file"));

quanRoute.get("/getAdsLocReport/:id_district", getAdsLocReport);

// quanRoute.put("/updateAdsLocReport/:id_district", updateAdsLocReport);

quanRoute.get("/getAdsReport/:id_district", getAdsReport);

// quanRoute.put("/putAdsReport/:id_district", putAdsReport);

// quanRoute.get("/getLocReport/:id_district", getLocReport);

// quanRoute.put("/putLocReport/:id_district", putLocReport);

// quanRoute.post("/createAds/:id_district", createAds, upload('createAds').single("file"))

// quanRoute.put("/deleteAdsCreate/:id_district", deleteAdsCreate, upload('deleteAdsCreate').single("file"))

module.exports = quanRoute;