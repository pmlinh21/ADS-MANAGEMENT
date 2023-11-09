const express = require('express');
const quanRoute = express.Router();
const { getLocType, getAdsType, getBoardType,
    getInfo, getWard, updateInfo, updatePassword, forgetPassword,
    getAdsLocation, getAds, updateAdsLoc, updateAds,
    getAdsLocReport, getAdsReport, getLocReport,
    updateAdsLocReport, updateAdsReport, updateLocReport,
    getAdsCreate, createAds, deleteAdsCreate } = require('../controllers/quanController')
const { upload } = require('../middlewares/upload');

quanRoute.get("/getLocType", getLocType);

quanRoute.get("/getAdsType", getAdsType);

quanRoute.get("/getBoardType", getBoardType);

quanRoute.get("/getInfo/:email", getInfo);

quanRoute.put("/updateInfo/:id_district", updateInfo);

quanRoute.put("/updatePassword/:id_district", updatePassword);

quanRoute.put("/forgetPassword/:id_district", forgetPassword);

quanRoute.get("/getWard/:id_district", getWard);

quanRoute.get("/getAdsLocation/:id_district", getAdsLocation);

quanRoute.post("/updateAdsLoc/:email", upload('updateAdsLoc').single("file"), updateAdsLoc);

quanRoute.get("/getAds/:id_district", getAds);

quanRoute.post("/updateAds/:id_district", upload('updateAds').single("file"), updateAds);

quanRoute.get("/getAdsLocReport/:id_district", getAdsLocReport);

quanRoute.put("/updateAdsLocReport/:id_req", updateAdsLocReport);

quanRoute.get("/getAdsReport/:id_district", getAdsReport);

quanRoute.put("/updateAdsReport/:id_req", updateAdsReport);

quanRoute.get("/getLocReport/:id_district", getLocReport);

quanRoute.put("/updateLocReport/:id_req", updateLocReport);

quanRoute.get("/getAdsCreate/:id_district", getAdsCreate);

quanRoute.post("/createAds/:id_district", upload('createAds').single("file"), createAds)

quanRoute.put("/deleteAdsCreate/:id_district", deleteAdsCreate)

module.exports = quanRoute;