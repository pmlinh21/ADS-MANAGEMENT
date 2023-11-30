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
                failCode(res, "", "Password or email is wrong!");
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
                failCode(res, "", "Password or email is wrong!");
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
                failCode(res, "", "Password or email is wrong!");
                return;
            }
        }

        failCode(res, "", "Password or email is wrong!");

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updatePassword = async(req,res) => {
    // let {email} = req.params

    // try{
    //     const data = await model.CanboSo.findOne({email: email})

    //     let passWordHash = bcrypt.hashSync(data.password, 10);
    
    //     const newdata = await model.CanboSo.update({ password: passWordHash }, {
    //         where: {email}
    //     });
    //     sucessCode(res,newdata,"Get thành công")

    // }catch(err){
    //     errorCode(res,"Lỗi BE")
    // }
}

module.exports = { getAdsType, getBoardType, getReportType, getLocType, login, updatePassword}