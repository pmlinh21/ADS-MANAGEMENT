const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");
const { parseToken } = require('../middlewares/baseToken');

const nodeMailer = require('nodemailer');
require('dotenv').config();

const bcrypt = require('bcrypt'); 

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
    // const obj = validateObj(req.body)

    let { email, pwd} = req.body

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
                sucessCode(res, parseToken({email: cbphuong.email, 
                    id_ward: cbphuong.id_ward, role: 2 }), "Login successfully");
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
                sucessCode(res, parseToken({
                    email: cbquan.email, 
                    id_district: cbquan.id_district, 
                    role: 1}), "Login successfully");
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
                sucessCode(res, parseToken({email: cbso.email,  role: 3}), "Login successfully");
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

const sendMail = (to, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    const options = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transport.sendMail(options);
}

const sendEmail = async(req, res) =>{
    try{
        let {email} = req.params

        let Phuong = await model.CanboPhuong.findOne({
            where: { email }
        })
        let Quan = await model.CanboQuan.findOne({
            where: { email }
        })
        let So = await model.CanboSo.findOne({
            where: { email }
        })

        if (Quan || Phuong || So){
            const otp = `${Math.floor(100000 + Math.random() * 900000)}`

            const htmlContent = `
                <html>
                <body>
                    <p>Để xác minh địa chỉ email của bạn và tạo mật khẩu mới, vui lòng nhập mã OTP sau đây trong vòng 3 phút:</p>
                    <p style = "font-size: 2.5rem"><strong>${otp}</strong></p>
                </body>
                </html>
                `;

            await sendMail(email, "Xác thực email", htmlContent)

            const hashOTP = bcrypt.hashSync(otp, 10)

            const now = new Date(Date.now() + 180000);

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');

            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            

            const record = await model.OTP.findOne({where:{email}})
            console.log(formattedDateTime)
            if(record)
                await model.OTP.update(
                    {OTP: hashOTP, expired_time: formattedDateTime},
                    {where: {email}})
            else
                await model.OTP.create(
                    {OTP: hashOTP, expired_time: formattedDateTime, email})

            sucessCode(res,"","Email tồn tại")
        }
            
        else   
            failCode(res,"","Email không được liên kết với bất cứ tài khoản nào")
      

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const checkOTP = async(req, res) =>{
    try{
        let {email, OTP} = req.params
          
        const record = await model.OTP.findOne({
            where: { email }
          });

        if (record) {
            const currentTime = new Date()
            const givenTime = new Date(record.expired_time);
            console.log (currentTime, "<", givenTime)

            const result = bcrypt.compareSync(OTP, record.OTP);
            if (result && givenTime >= currentTime){
                sucessCode(res, "","Thành công")
            }
            else if (!result)
                failCode(res,"","OTP không chính xác")
            else 
                failCode(res,"","OTP đã hết hạn")
        }
        else
            failCode(res,"","OTP không chính xác")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const createNewPwd = async(req,res) => {
    try{
        let {email,password} = req.body

        let passWordHash = bcrypt.hashSync(password, 10);

        const phuong = await model.CanboPhuong.findOne({where: {email}})
        if (phuong)
            await model.CanboPhuong.update({password: passWordHash},{where: {email}})

        const quan = await model.CanboQuan.findOne({where: {email}})
        if (quan)
            await model.CanboQuan.update({password: passWordHash},{where: {email}})

        const so = await model.CanboSo.findOne({where: {email}})
        if (so)
            await model.CanboSo.update({password: passWordHash},{where: {email}})

        sucessCode(res,"","Get thành công")

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

const getAdsCreateByID = async(req, res) =>{
    try{
        let { id_create } = req.params;

        const [data, metadata] = await sequelize.query
        (`SELECT ac.*, bt.board_type, w.ward, d.district, al.address as address_adsloc
        FROM Ads_create ac
        INNER JOIN Board_type bt ON bt.id_board_type = ac.id_board_type
        INNER JOIN Ads_location al ON al.id_ads_location = ac.id_ads_location
        INNER JOIN Ward w ON w.id_ward = al.id_ward
        INNER JOIN District d ON d.id_district = w.id_district
        WHERE ac.id_create = ${id_create}`);
        
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const deleteAdsCreateByID = async(req, res) =>{
    try{
        let { id_create } = req.params;

        await model.Ads_create.destroy(
            { where:{
            id_create
        }})
        
        sucessCode(res,"","Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}



module.exports = { getAdsType, getBoardType, getReportType, getLocType,
    getAdsReportByID, getAdsLocReportByID, getLocReportByID, 
    updateAdsReportByID, updateAdsLocReportByID, updateLocReportByID,
    getAdsCreateByID, deleteAdsCreateByID,
    login, sendEmail, checkOTP, createNewPwd, updatePassword}