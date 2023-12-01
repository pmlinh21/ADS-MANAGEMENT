const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

const bcrypt = require('bcrypt'); 

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

const login = async(req, res) =>{
    const obj = validateObj(req.body)

    let { email, pwd} = obj

    try{
        let cbphuong = await model.CanboPhuong.findOne({
            where: {
                email
            }
        });

        if (cbphuong){
            let checkPass = bcrypt.compareSync(pwd, cbphuong.password);
            if(checkPass){
                cbphuong.password = '**********';
                sucessCode(res, {info: cbphuong, role: 2}, "Login successfully");
                return;
            }
            else{
                failCode(res, "", "Email hay mật khẩu không đúng");
                return;
            }
        } 

        let cbquan = await model.CanboQuan.findOne({
            where: {
                email
            }
        });

        if (cbquan){
            let checkPass = bcrypt.compareSync(pwd, cbquan.password);
            if(checkPass){
                cbquan.password = '**********';
                sucessCode(res, {info: cbquan, role: 1}, "Login successfully");
                return;
            }
            else{
                failCode(res, "", "Email hay mật khẩu không đúng");
                return;
            }
            
        }

        let cbso = await model.CanboSo.findOne({
            where: {
                email
            }
        });

        if (cbso){
            let checkPass = bcrypt.compareSync(pwd, cbso.password);
            if(checkPass){
                cbso.password = '**********';
                sucessCode(res, {info: cbso, role: 3}, "Login successfully");
                return;
            }
            else{
                failCode(res, "", "Email hay mật khẩu không đúng");
                return;
            }
        }

        failCode(res, "", "Email hay mật khẩu không đúng");

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updatePassword = async(req,res) => {
    let {email} = req.params

    try{
        const data = await model.CanboSo.findOne({where: {email}})

        let passWordHash = bcrypt.hashSync(data.password, 10);
    
        const newdata = await model.CanboSo.update({ password: passWordHash }, {
            where: {email}
        });
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT ar.*, rt.report_type, w.ward
            FROM Ads_report ar
            INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
            INNER JOIN Ads a ON a.id_ads = ar.id_ads
            INNER JOIN Ads_location al ON al.id_ads_location = a.id_ads_location
            INNER JOIN Ward w ON w.id_ward = al.id_ward
            WHERE ar.id_report = ${id_report}`);
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsLocReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT ar.*, rt.report_type, w.ward
            FROM Ads_loc_report ar
            INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
            INNER JOIN Ads_location al ON al.id_ads_location = ar.id_ads_location
            INNER JOIN Ward w ON w.id_ward = al.id_ward
            WHERE ar.id_report = ${id_report}`);
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getLocReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT ar.*, rt.report_type, w.ward, d.district
            FROM Location_report ar
            INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
            INNER JOIN Ward w ON w.id_ward = ar.id_ward
            INNER JOIN District d ON d.id_district = w.id_district
            WHERE ar.id_report = ${id_report}`);
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updateAdsReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        let {resolve, status, role, email} = req.body

        await model.Ads_report.update({
            resolve, status, 
            office: role, 
            officer: email
        }, {
            where:{
                id_report
            }
       })
        sucessCode(res,{resolve, status, role, email},"Update thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updateAdsLocReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        let {resolve, status, role, email} = req.body

        await model.Ads_loc_report.update({
            resolve, status, 
            office: role, 
            officer: email
        }, {
            where:{
                id_report
            }
       })
        sucessCode(res,{resolve, status, role, email},"Update thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updateLocReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        let {resolve, status, role, email} = req.body

        await model.Location_report.update({
            resolve, status, 
            office: role, 
            officer: email
        }, {
            where:{
                id_report
            }
       })
        sucessCode(res,{resolve, status, role, email},"Update thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}


module.exports = { getAdsType, getBoardType, getReportType, getLocType,
    getAdsReportByID, getAdsLocReportByID, getLocReportByID,
    updateAdsReportByID, updateAdsLocReportByID, updateLocReportByID,
    login, updatePassword}