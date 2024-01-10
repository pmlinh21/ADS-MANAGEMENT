const express = require('express');
const db = require('../models/index')
const nguoidanRoute = express.Router();
const { getAdsLoc, getReport, getLocReport, createAdsReport, createLocReport, createAdsLocReport,verifyCaptcha } = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');
const { AdsReport } = require('../models/Ads_report');
const init_models = require('../models/init-models');
const sequelize = db.sequelize;
const model = init_models(sequelize)
const { sucessCode, failCode, errorCode } = require('../config/response');

nguoidanRoute.get("/getAdsLoc", getAdsLoc);

nguoidanRoute.post('/createAdsReport', createAdsReport);

nguoidanRoute.post('/createLocReport', createLocReport);

nguoidanRoute.post('/createAdsLocReport', createAdsLocReport);

nguoidanRoute.get("/getLocReport", getLocReport);

nguoidanRoute.post("/verifyCaptcha", verifyCaptcha);

module.exports = nguoidanRoute;