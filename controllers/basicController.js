// postgresql
const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

// response config
const { sucessCode, failCode, errorCode } = require('../config/response');

// env config
require('dotenv').config()

// email
const nodeMailer = require('nodemailer');

// time config
const moment = require('moment');

// encode password and email
const bcrypt = require('bcryptjs'); 

// jwt
const { parseToken } = require('../middlewares/baseToken');

// image with cloudinary
const { deleteImage } = require('../middlewares/deleteImage');
const cloudinary = require('cloudinary').v2;

const uploadImage = function (req, res) {
    const timestamp = Math.round((new Date).getTime()/1000);

    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'image'}, process.env.SECRET_KEY);

    res.json({
        signature: signature,
        timestamp: timestamp,
        cloudname: process.env.CLOUD_NAME,
        apikey: process.env.API_KEY
    })
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

const findEmail = async(req, res) =>{
    try{
        let {email} = req.body
        console.log(email)

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

        const emailExists = canbo.some(item => item.email === email);

        if (emailExists){
            // console.log(process.env.HASH_SALT)
            const hashEmail = bcrypt.hashSync(email, parseInt(process.env.HASH_SALT))
            console.log(hashEmail)
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
        let {email} = req.body
        console.log(email)
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
        // console.log(canbo)
        for (let i = 0; i < canbo?.length; i++){
            // console.log(canbo[i].email)
            const match = bcrypt.compareSync(canbo[i].email, email);
            if (match){
                const otp = `${Math.floor(100000 + Math.random() * 900000)}`

                const htmlContent = `
                    <html>
                    <body>
                        <p>Để xác minh địa chỉ email của bạn và tạo mật khẩu mới, vui lòng nhập mã OTP sau đây trong vòng 5 phút:</p>
                        <p style = "font-size: 2.5rem"><strong>${otp}</strong></p>
                    </body>
                    </html>
                    `;
    
                await sendMail(canbo[i].email, "Xác thực email", htmlContent)
    
                const hashOTP = bcrypt.hashSync(otp, parseInt(process.env.HASH_SALT));
    
                const formattedDateTime = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ssZ');
                // console.log(formattedDateTime)
    
                const record = await model.OTP.findOne({where:{email: canbo[i].email}})
                // console.log(hashOTP)
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
        let {email, OTP} = req.body

        const record = await model.OTP.findAll();

        for (let i = 0; i < record.length; i++){
            const match = bcrypt.compareSync(record[i].email, email);
            if (match){
                const currentTime = moment();
                const givenTime = moment.utc(record[i].expired_time);
                // console.log (record[i].OTP)
                // console.log (givenTime ," > ", currentTime)
    
                const result = bcrypt.compareSync(OTP, record[i].OTP);
                // console.log (result)
                if (result && givenTime.isAfter(currentTime)){
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
        let {emailHash ,password} = req.body

        console.log(emailHash, password)
        let passWordHash = bcrypt.hashSync(password, parseInt(process.env.HASH_SALT));

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

        var email = ""
        for (let i = 0; i < canbo?.length; i++){
            const match = bcrypt.compareSync(canbo[i].email, emailHash);
            if (match){
                email = canbo[i].email
                break
            }
        }

        const phuong = await model.CanboPhuong.findOne({
            where:{email: email}
        })
        if (phuong)
            phuong.update({password: passWordHash})

        const quan = await model.CanboQuan.findOne({
            where:{email: email}
        })
        if (quan){
            console.log(quan)
            quan.update({password: passWordHash})
        }

        const so = await model.CanboSo.findOne({
            where:{email: email}
        })
        if (so)
            so.update({password: passWordHash})

        sucessCode(res,"","Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updatePassword = async(req,res) => {
    let { email, role } = req.params
    let { cur_password, new_password } = req.body;
    
    try{
        if (role == 2){
            let cbphuong = await model.CanboPhuong.findOne({
                where: {
                    email
                }
            });
            if(cbphuong){
                let checkPass = bcrypt.compareSync(cur_password, cbphuong.password);
                if(checkPass){
                    let passWordHash = bcrypt.hashSync(new_password, 10);
                    await model.CanboPhuong.update({
                        password:passWordHash
                    }, {
                        where: {
                            email: email
                        }
                    })
                    let data = await model.CanboPhuong.findOne({
                        where: {
                            email
                        }
                    });
                    sucessCode(res, data, "Update thành công");
                    return;
                }
                else{
                    sucessCode(res, "", "Mật khẩu hiện tại không chính xác");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ phường");
                return;
            }
        }
        if (role == 1){
            let cbquan = await model.CanboQuan.findOne({
                where: {
                    email
                }
            });
            if(cbquan){
                let checkPass = bcrypt.compareSync(cur_password, cbquan.password);
                if(checkPass){
                    let passWordHash = bcrypt.hashSync(new_password, 10);
                    await model.CanboQuan.update({
                        password:passWordHash
                    }, {
                        where: {
                            email: email
                        }
                    })
                    let data = await model.CanboQuan.findOne({
                        where: {
                            email
                        }
                    });
                    sucessCode(res, data, "Update thành công");
                    return;
                }
                else{
                    sucessCode(res, "", "Mật khẩu hiện tại không chính xác");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ quận");
                return;
            }
        }
        if (role == 3){
            let cbso = await model.CanboSo.findOne({
                where: {
                    email
                }
            });
            if(cbso){
                let checkPass = bcrypt.compareSync(cur_password, cbso.password);
                if(checkPass){
                    let passWordHash = bcrypt.hashSync(new_password, 10);
                    await model.CanboSo.update({
                        password:passWordHash
                    }, {
                        where: {
                            email: email
                        }
                    })
                    let data = await model.CanboSo.findOne({
                        where: {
                            email
                        }
                    });
                    sucessCode(res, data, "Update thành công");
                    return;
                }
                else{
                    sucessCode(res, "", "Mật khẩu hiện tại không chính xác");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ sở");
                return;
            }
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const comparePassword = async(req,res) => {
    let { email, role } = req.params
    let { cf_password } = req.body;
    
    console.log("compare")
    try{
        if (role == 2){
            console.log("role")
            let cbphuong = await model.CanboPhuong.findOne({
                where: {
                    email
                }
            });
            if(cbphuong){
                console.log("cbphuong")
                let checkPass = bcrypt.compareSync(cf_password, cbphuong.password);
                console.log("checkPass: ", checkPass);
                if(checkPass){
                    console.log("trung")
                    sucessCode(res, checkPass, "Mật khẩu mới trùng với mật khẩu cũ");
                    return;
                }
                else{
                    console.log("khong trung")
                    sucessCode(res, checkPass, "Mật khẩu mới không trùng với mật khẩu cũ");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ phường");
                return;
            }
        }
        if (role == 1){
            let cbquan = await model.CanboQuan.findOne({
                where: {
                    email
                }
            });
            if(cbquan){
                let checkPass = bcrypt.compareSync(cf_password, cbquan.password);
                if(checkPass){
                    sucessCode(res, checkPass, "Mật khẩu mới trùng với mật khẩu cũ");
                    return;
                }
                else{
                    sucessCode(res, checkPass, "Mật khẩu mới không trùng với mật khẩu cũ");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ quận");
                return;
            }
        }
        if (role == 3){
            let cbso = await model.CanboSo.findOne({
                where: {
                    email
                }
            });
            if(cbso){
                let checkPass = bcrypt.compareSync(cf_password, cbso.password);
                if(checkPass){
                    sucessCode(res, checkPass, "Mật khẩu mới trùng với mật khẩu cũ");
                    return;
                }
                else{
                    sucessCode(res, checkPass, "Mật khẩu mới không trùng với mật khẩu cũ");
                    return;
                }
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ sở");
                return;
            }
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsReportByID = async(req, res) =>{
    try{
        let { id_report } = req.params;

        const [data, metadata] = await sequelize.query
            (`SELECT ar.*, rt.report_type, w.ward, w.id_ward, w.id_district
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
            (`SELECT ar.*, rt.report_type, w.ward, w.id_ward, w.id_district
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
            (`SELECT ar.*, rt.report_type, w.ward, d.district, w.id_ward, w.id_district
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

       const [data, metadata] = await sequelize.query
            (`SELECT ar.content, ar.email, ar.report_time, ar.resolve,
            rt.report_type, w.ward, d.district, al.address
            FROM Ads_loc_report ar
            INNER JOIN Report_type rt ON ar.id_report = ${id_report} AND rt.id_report_type = ar.id_report_type
            INNER JOIN Ads_location al ON al.id_ads_location = ar.id_ads_location
            INNER JOIN Ward w ON w.id_ward = al.id_ward
            INNER JOIN District d ON d.id_district = w.id_district`);
        const record = data[0]

        await sendMail(record.email, "Thông báo xử lí báo cáo vi phạm", 
            getReportHtmlContent(record.content, formatDate(record.report_time), record.report_type, record.resolve, 
            "điểm đặt", `${record.address}, phường ${record.ward}, ${record.district}`
        ))
        
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

       const [data, metadata] = await sequelize.query
            (`SELECT ar.email, ar.report_time, ar.content, ar.resolve, ar.address, rt.report_type, w.ward, d.district
            FROM Location_report ar
            INNER JOIN Report_type rt ON ar.id_report = ${id_report} AND rt.id_report_type = ar.id_report_type
            INNER JOIN Ward w ON w.id_ward = ar.id_ward
            INNER JOIN District d ON d.id_district = w.id_district`);
        const record = data[0]

        await sendMail(record.email, "Thông báo xử lí báo cáo vi phạm", 
            getReportHtmlContent(record.content, formatDate(record.report_time), record.report_type, record.resolve, 
            "", `${record.address}, phường ${record.ward}, ${record.district}`
        ))

        sucessCode(res,{resolve, status, role, email},"Update thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAdsCreateByID = async(req, res) =>{
    try{
        let { id_create } = req.params;

        const [data, metadata] = await sequelize.query
        (`SELECT ac.*, bt.board_type, w.*, d.*, al.address as address_adsloc
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

const getAdsCreateByAds = async(req, res) =>{
    try{
        let { id_ads } = req.params;

        const [data, metadata] = await sequelize.query
        (`SELECT ac.*, bt.board_type, w.*, d.*, al.address as address_adsloc
        FROM Ads_create ac
        INNER JOIN Board_type bt ON bt.id_board_type = ac.id_board_type
        INNER JOIN Ads_location al ON al.id_ads_location = ac.id_ads_location
        INNER JOIN Ward w ON w.id_ward = al.id_ward
        INNER JOIN District d ON d.id_district = w.id_district
        WHERE ac.id_ads = ${id_ads}
        ORDER BY id_create `);
        
        sucessCode(res,data,"Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const deleteAdsCreateByID = async(req, res) =>{
    try{
        let { id_create } = req.params;

        const record = await model.Ads_create.findOne(
            { where:{
            id_create
        }})

        const row = await model.Ads_create.findAll({
            where: {
                id_ads: record.id_ads
            }
        })
        
        // cấp phép tạo ads, không phải cấp phép gia hạn
        if (row.length == 1) {

            await model.Ads_update.destroy({
                where: {
                    id_ads: record.id_ads
                }
            })

            await model.Ads.destroy({
                where: {
                    id_ads: record.id_ads
                }
            })

            if (record.photo)
                deleteImage(record.photo)
        }

        await model.Ads_create.destroy(
            { where:{
            id_create
        }})
        
        sucessCode(res,"","Get thành công")

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getAccountInfo = async(req, res) =>{
    let { email, role } = req.params;

    try{
        if (role == 1){
            let cbquan = await model.CanboQuan.findOne({
                attributes: ['fullname', 'phone', 'birthdate', 'id_district'],
                where: {
                    email
                }
            });
            if(cbquan){
                sucessCode(res, cbquan, "Lấy thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ quận");
                return;
            }
        } 

        if (role == 2){
            let cbphuong = await model.CanboPhuong.findOne({
                attributes: ['fullname', 'phone', 'birthdate', 'id_ward'],
                where: {
                    email
                }
            });
            if(cbphuong){
                sucessCode(res, cbphuong, "Lấy thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ phường");
                return;
            }
        } 

        if (role == 3){
            let cbso = await model.CanboSo.findOne({
                attributes: ['fullname', 'phone', 'birthdate'],
                where: {
                    email
                }
            });
            if(cbso){
                sucessCode(res, cbso, "Lấy thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ sở");
                return;
            }
        }
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updateInfo = async(req, res) =>{
    try{
        let { email, role } = req.params;
        let { fullname, birthdate, phone } = req.body;
        try{
            if (role == 1){
                let cbquan = await model.CanboQuan.findOne({
                    where: {
                        email
                    }
                });
                if(cbquan){
                    await model.CanboQuan.update({ 
                        fullname, birthdate, phone
                    }, {
                        where:{
                            email
                        }
                    }); 
                    let data = await model.CanboQuan.findOne({
                        where:{
                            email
                        }
                    });
                    sucessCode(res,data,"Update thành công");
                    return;
                }
                else{
                    failCode(res, "", "Không tìm thấy cán bộ quận");
                    return;
                }
            } 
    
            if (role == 2){
                let cbphuong = await model.CanboPhuong.findOne({
                    where: {
                        email
                    }
                });
                if(cbphuong){
                    await model.CanboPhuong.update({ 
                        fullname, birthdate, phone
                    }, {
                        where:{
                            email
                        }
                    }); 
                    let data = await model.CanboPhuong.findOne({
                        where:{
                            email
                        }
                    });
                    sucessCode(res,data,"Update thành công");
                    return;
                }
                else{
                    failCode(res, "", "Không tìm thấy cán bộ phường");
                    return;
                }
            } 
    
            if (role == 3){
                let cbso = await model.CanboSo.findOne({
                    where: {
                        email
                    }
                });
                if(cbso){
                    await model.CanboSo.update({ 
                        fullname, birthdate, phone
                    }, {
                        where:{
                            email
                        }
                    }); 
                    let data = await model.CanboSo.findOne({
                        where:{
                            email
                        }
                    });
                    sucessCode(res,data,"Update thành công");
                    return;
                }
                else{
                    failCode(res, "", "Không tìm thấy cán bộ phường");
                    return;
                }
            }
        }catch(err){
            errorCode(res,"Lỗi BE")
        }

    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const updatePasswordByOTP = async(req,res) => {
    let { email, role } = req.params
    let { new_password } = req.body;
    
    try{
        if (role == 2){
            let cbphuong = await model.CanboPhuong.findOne({
                where: {
                    email
                }
            });
            if(cbphuong){
                let passWordHash = bcrypt.hashSync(new_password, 10);
                await model.CanboPhuong.update({
                    password:passWordHash
                }, {
                    where: {
                        email: email
                    }
                })
                let data = await model.CanboPhuong.findOne({
                    where: {
                        email
                    }
                });
                sucessCode(res, data, "Update thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ phường");
                return;
            }
        }
        if (role == 1){
            let cbquan = await model.CanboQuan.findOne({
                where: {
                    email
                }
            });
            if(cbquan){
                let passWordHash = bcrypt.hashSync(new_password, 10);
                await model.CanboQuan.update({
                    password:passWordHash
                }, {
                    where: {
                        email: email
                    }
                })
                let data = await model.CanboQuan.findOne({
                    where: {
                        email
                    }
                });
                sucessCode(res, data, "Update thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ quận");
                return;
            }
        }
        if (role == 3){
            let cbso = await model.CanboSo.findOne({
                where: {
                    email
                }
            });
            if(cbso){
                let passWordHash = bcrypt.hashSync(new_password, 10);
                await model.CanboSo.update({
                    password:passWordHash
                }, {
                    where: {
                        email: email
                    }
                })
                let data = await model.CanboSo.findOne({
                    where: {
                        email
                    }
                });
                sucessCode(res, data, "Update thành công");
                return;
            }
            else{
                failCode(res, "", "Không tìm thấy cán bộ sở");
                return;
            }
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getAdsType, getBoardType, getReportType, getLocType,
    getAdsReportByID, getAdsLocReportByID, getLocReportByID, 
    updateAdsReportByID, updateAdsLocReportByID, updateLocReportByID,
    getAdsCreateByID, deleteAdsCreateByID, getAdsCreateByAds,
    login, findEmail, sendEmail, checkOTP, createNewPwd, updatePassword,
    getAccountInfo, updateInfo, updatePasswordByOTP, uploadImage, comparePassword}