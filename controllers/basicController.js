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
                email, password: pwd
            }
        });

        if (cbphuong){
            sucessCode(res,{info: cbphuong, role: 2},"Get thành công")
        } 
        else{
            let cbquan = await model.CanboQuan.findOne({
                where: {
                    email, password: pwd
                }
            });
    
            if (cbquan){
                sucessCode(res,{info: cbquan, role: 1},"Get thành công")
            }
            else {
                let cbso = await model.CanboSo.findOne({
                    where: {
                        email, password: pwd
                    }
                });
        
                if (cbso){
                    sucessCode(res,{info: cbso, role: 3},"Get thành công")
                }
                else 
                    failCode(res,"","Email hoặc mật khẩu không đúng")
            } 
        }

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getAdsType, getBoardType, getReportType, getLocType, login}