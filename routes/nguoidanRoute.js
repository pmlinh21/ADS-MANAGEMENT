const express = require('express');
const db = require('../models/index')
const nguoidanRoute = express.Router();
const { getAdsLoc, getReport, getLocReport, } = require('../controllers/nguoidanController')
const { upload } = require('../middlewares/upload');
const { AdsReport } = require('../models/Ads_report');
const init_models = require('../models/init-models');
const sequelize = db.sequelize;
const model = init_models(sequelize)
const { sucessCode, failCode, errorCode } = require('../config/response');

nguoidanRoute.get("/getAdsLoc", getAdsLoc);

nguoidanRoute.post('/createAdsReport', async (req, res) => {
    // Access the request body
    const requestData = req.body;
    const jsonString = Object.keys(requestData)[0];
    const data = JSON.parse(jsonString);
            try {
        const ads_report = await model.Ads_report.create({
            officer: data.officer,
            office: data.office,
            id_ads: data.id_ads,
            id_report_type: data.id_report_type,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            content: data.content,
            status: data.status,
            photo1: data.photo1,
            photo2: data.photo2,
            resolve: "",
            report_time: data.report_time,
        })
        res.status(200).json(sucessCode("Tạo report thành công"))
    } catch(err){
        console.log(err)
    }
});

nguoidanRoute.get("/getLocReport", getLocReport);

module.exports = nguoidanRoute;