const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

function validateObj(obj) {
    Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        if (value === "" || value === "null") {
            obj[key] = null;
        }else {
            try {
              obj[key] = JSON.parse(value);
            } catch (error) {
              obj[key] = value;
            }
          }
      });
    return obj;
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

//
const getInfo = async(req, res) =>{
    try{
        let { email } = req.params;
        let check_district = await model.CanboQuan.findOne({
            where:{
                email
            }
        });
        if(check_district){
            let data = await model.CanboQuan.findOne({
                where:{
                    email
                }
            });
            data.password = "********"
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Cán bộ quận không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

const getWard = async(req, res) =>{
    try{
        let { id_district } = req.params;

        let data = await model.Ward.findAll({
            where:{
                id_district
            }
        });
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsLocation = async(req, res) =>{
    try{
        let { id_district } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT al.id_ads_location, al.address, w.ward, lt.loc_type, at.ads_type, al.is_zoning, 
            al.photo, al.longitude, al.latitude
            FROM Ads_location al
            INNER JOIN Ward w ON al.id_ward = w.id_ward
            INNER JOIN Location_type lt ON lt.id_loc_type = al.id_loc_type 
            INNER JOIN Ads_type at ON at.id_ads_type = al.id_ads_type
            WHERE al.id_district = ${id_district}
            ORDER BY al.id_ads_location`);
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//
const getAds = async(req, res) =>{
    try{
        let { id_district } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT *
            FROM Ads 
            WHERE Ads.id_ads_location IN (
                SELECT id_ads_location
                FROM Ads_location
                WHERE Ads_location.id_district = ${id_district}
            )`);

        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//
const getAdsLocReport = async(req, res) =>{
    try{
        let { id_district } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT *
            FROM Ads_loc_report 
            WHERE Ads_loc_report.id_ads_location IN (
                SELECT id_ads_location
                FROM Ads_location
                WHERE Ads_location.id_district = ${id_district}
            )`);

        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//
const getAdsReport = async(req, res) =>{
    try{
        let { id_district } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT *
            FROM Ads_report 
            WHERE Ads_report.id_ads IN (
                SELECT id_ads
                FROM Ads a
                INNER JOIN Ads_location al 
                ON a.id_ads_location = al.id_ads_location AND al.id_district = ${id_district}
            )`);
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//
const getLocReport = async(req, res) =>{
    try{
        // let { id_district } = req.params;

        // let data = await model.Ads_location.findAll({
        //     where:{
        //         id_district
        //     }
        // });
        // sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}  

const updateAdsLoc = async(req, res) =>{
    try{
        let { email } = req.params;

        const obj = validateObj(req.body)

        let { id_ads_location, latitude, longitude, address, id_ward, id_district, 
            id_loc_type, photo, id_ads_type, is_zoning, req_time, reason, office} = obj
    
        const data = await model.Ads_loc_update.create({
            id_ads_location, latitude, longitude, address, id_ward, id_district, 
            id_loc_type, photo, id_ads_type, is_zoning, req_time, reason, office,
            officer: email,
            status: 0
        });

        sucessCode(res,data, "Create thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

// const getAdsLocation = async(req, res) =>{
//     try{
//         let { id_district } = req.params;

//         let data = await model.Ads_location.findAll({
//             where:{
//                 id_district
//             }
//         });
//         sucessCode(res,data,"Get thành công")

//     }catch(err){
//         errorCode(res,"Lỗi BE")
//     }
// } 

// const getAdsLocation = async(req, res) =>{
//     try{
//         let { id_district } = req.params;

//         let data = await model.Ads_location.findAll({
//             where:{
//                 id_district
//             }
//         });
//         sucessCode(res,data,"Get thành công")

//     }catch(err){
//         errorCode(res,"Lỗi BE")
//     }
// } 

// const getAdsLocation = async(req, res) =>{
//     try{
//         let { id_district } = req.params;

//         let data = await model.Ads_location.findAll({
//             where:{
//                 id_district
//             }
//         });
//         sucessCode(res,data,"Get thành công")

//     }catch(err){
//         errorCode(res,"Lỗi BE")
//     }
// } 

module.exports = { getLocType, getAdsType, getBoardType,
    getInfo, getWard,
    getAdsLocation, getAds, updateAdsLoc,
    getAdsLocReport, getAdsReport, getLocReport}