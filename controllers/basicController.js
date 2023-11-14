const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");


const getReportType = async(req, res) =>{
    try{
        let data = await model.Report_type.findAll();
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getLocType = async(req, res) =>{
    try{
        let data = await model.Location_type.findAll();
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsType = async(req, res) =>{
    try{
        let data = await model.Ads_type.findAll();
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getBoardType = async(req, res) =>{
    try{
        let data = await model.Board_type.findAll();
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getAdsType, getBoardType, getReportType, getLocType}