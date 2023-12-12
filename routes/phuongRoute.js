const express = require('express');
const phuongRoute = express.Router();
const {
    getCanBoPhuong, getMapAdsLoc
} = require('../controllers/phuongController')
const { upload } = require('../middlewares/upload');

phuongRoute.get("/getCanBoPhuong", getCanBoPhuong);
phuongRoute.get("/getMapAdsLoc/:id_ward", getMapAdsLoc);

module.exports = phuongRoute;