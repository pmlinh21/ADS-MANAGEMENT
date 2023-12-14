const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");
const { parseToken } = require('../middlewares/baseToken');
require('dotenv').config()
const nodeMailer = require('nodemailer');

const bcrypt = require('bcryptjs'); 

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

const findEmail = async(req, res) =>{
    try{
        let {email} = req.body
        console.log(email)

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
            // console.log(process.env.HASH_SALT)
            const hashEmail = bcrypt.hashSync(email, parseInt(process.env.HASH_SALT))
            // console.log(hashEmail)
            sucessCode(res,hashEmail,"Email tồn tại")
        }
            
        else   
            failCode(res,"","Email không được liên kết với bất cứ tài khoản nào")
      

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

const formatDate = (now)=>{
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const sendEmail = async(req, res) =>{
    try{
        let {email} = req.params

        const [canbo, metadata] = await sequelize.query(`
            SELECT CanboPhuong.email
            FROM CanboPhuong
            UNION
            SELECT CanboSo.email
            FROM CanboSo
            UNION
            SELECT CanboQuan.email
            FROM CanboQuan
            `);

        console.log(canbo)
        for (let i = 0; i < canbo.length; i++){
            const match = bcrypt.compareSync(canbo[i].email, email);
            if (match){
                console.log(canbo[i].email)

                const otp = `${Math.floor(100000 + Math.random() * 900000)}`

                const htmlContent = `
                    <html>
                    <body>
                        <p>Để xác minh địa chỉ email của bạn và tạo mật khẩu mới, vui lòng nhập mã OTP sau đây trong vòng 3 phút:</p>
                        <p style = "font-size: 2.5rem"><strong>${otp}</strong></p>
                    </body>
                    </html>
                    `;
    
                await sendMail(canbo[i].email, "Xác thực email", htmlContent)
    
                const hashOTP = bcrypt.hashSync(otp, parseInt(process.env.HASH_SALT));
    
                const now = new Date(Date.now() + 300000);
                const formattedDateTime = formatDate(now);
                
    
                const record = await model.OTP.findOne({where:{email: canbo[i].email}})
                console.log(hashOTP)
                if(record)
                    await model.OTP.update(
                        {OTP: hashOTP, expired_time: formattedDateTime},
                        {where: {email: canbo[i].email}})
                else
                    await model.OTP.create(
                        {email: canbo[i].email, expired_time: formattedDateTime, OTP: hashOTP})

                break;
            }
        }

        sucessCode(res,"","Đã gửi email")
      

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const checkOTP = async(req, res) =>{
    try{
        let {email, OTP} = req.params
          
        const [record, metadata] = await sequelize.query(`
            SELECT *
            FROM Otp
            `);

        console.log(record)
        for (let i = 0; i < record.length; i++){
            const match = bcrypt.compareSync(record[i].email, email);
            if (match){
                const currentTime = new Date()
                const givenTime = new Date(record[i].expired_time);
                console.log (currentTime, ">=", givenTime)
    
                const result = bcrypt.compareSync(OTP, record[i].otp);
                if (result && givenTime <= currentTime){
                    sucessCode(res, "","Thành công")
                }
                else if (!result)
                    failCode(res,"","OTP không chính xác")
                else 
                    failCode(res,"","OTP đã hết hạn")
                break;
            }
        }

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const createNewPwd = async(req,res) => {
    try{
        let {email,password} = req.body

        let passWordHash = bcrypt.hashSync(password, HASH_SALT);

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

        let passWordHash = bcrypt.hashSync(data.password, HASH_SALT);
    
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

const getReportHtmlContent = function(content, report_time, report_type, resolve, type, address ){
    const htmlContent = `<body>
    <h1>Thông báo xử lí báo cáo vi phạm</h1>
    <p>Xin chào,</p>
    
    <p>Chúng tôi xin thông báo rằng chúng tôi đã xử lí báo cáo vi phạm từ bạn. Chi tiết về vi phạm và cách thức xử lí được cung cấp dưới đây:</p>
    
    <h2>Thông tin báo cáo vi phạm:</h2>
    <ul>
      <li><strong>Địa điểm ${type}:</strong> ${address}</li>
      <li><strong>Ngày báo cáo:</strong> ${report_time}</li>
      <li><strong>Hình thức báo cáo:</strong> ${report_type}</li>
      <li><strong>Nội dung báo cáo:</strong> ${content}</li>
    </ul>
    
    <h2>Cách thức xử lí:</h2>
    <p>"${resolve} "</p>
    
    <p>Xin cảm ơn sự hợp tác của bạn trong việc báo cáo vi phạm này. Chúng tôi cam kết duy trì một môi trường an toàn và tuân thủ quy định và chính sách của chúng tôi.</p>
    
    <p>Trân trọng,</p>
    <p><strong>ADS MAP</strong></p>
  </body>`
    return htmlContent
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

        const [data, metadata] = await sequelize.query
                (`SELECT ar.*, rt.report_type, w.ward, d.district, al.address
                FROM Ads_report ar
                INNER JOIN Report_type rt ON rt.id_report_type = ar.id_report_type
                INNER JOIN Ads a ON a.id_ads = ar.id_ads
                INNER JOIN Ads_location al ON al.id_ads_location = a.id_ads_location
                INNER JOIN Ward w ON w.id_ward = al.id_ward
                INNER JOIN District d ON d.id_district = w.id_district
                WHERE ar.id_report = ${id_report}`);
        const record = data[0]

        await sendMail(record.email, "Thông báo xử lí báo cáo vi phạm", 
            getReportHtmlContent(record.content, formatDate(record.report_time), record.report_type, record.resolve, 
            "bảng quảng cáo", `${record.address}, phường ${record.ward}, ${record.district}`
        ))

        sucessCode(res,"","Update thành công")

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

// delete hinh anh
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
    login, findEmail, sendEmail, checkOTP, createNewPwd, updatePassword}