const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs'); 

// QUANLICHUNG --- Statistic
const getSoLuongQuan = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_district) AS \"soLuongQuan\" FROM District");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongPhuong = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ward) AS \"soLuongPhuong\" FROM Ward");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongCanBo = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(T.email) AS \"soLuongCanBo\" FROM ( (SELECT email FROM CanboSo) UNION (SELECT email FROM CanboQuan ) UNION (SELECT email FROM CanboPhuong)) T");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongDDQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ads_location) AS \"soLuongDDQC\" FROM Ads_location");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongBQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ads) AS \"soLuongBQC\" FROM Ads");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICHUNG --- Loai Vi Tri
const getLoaiViTri = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM Location_type ORDER BY id_loc_type");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateLoaiViTri = async (req, res) => {
    try {
        const { id, name } = req.body;
        // const [data, metadata] = await sequelize.query(`UPDATE Location_type SET loc_type = '${name}' WHERE id_loc_type = ${id}`);
        const data = await model.Location_type.update({
            loc_type: name
        }, {
            where: {
                id_loc_type: id
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteLoaiViTri = async (req, res) => {
    try {
        const id = req.body.id;
        await model.Location_type.destroy({
            where: {
                id_loc_type: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoạin");
    }
}

const addLoaiViTri = async (req, res) => {
    try {
        const name = req.body.name;
        const data = await model.Location_type.create({
            loc_type: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICHUNG --- Hinh Thuc Quang Cao
const getHinhThucQuangCao = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM Ads_type ORDER BY id_ads_type");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateHinhThucQuangCao = async (req, res) => {
    try {
        const { id, name } = req.body;
        const data = await model.Ads_type.update({
            ads_type: name
        }, {
            where: {
                id_ads_type: id
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteHinhThucQuangCao = async (req, res) => {
    try {
        const id = req.body.id;
        await model.Ads_type.destroy({
            where: {
                id_ads_type: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addHinhThucQuangCao = async (req, res) => {
    try {
        const name = req.body.name;
        const data = await model.Ads_type.create({
            ads_type: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }

}

// QUANLICHUNG --- Loai Hinh Bao Cao
const getLoaiHinhBaoCao = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM Report_type ORDER BY id_report_type");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateLoaiHinhBaoCao = async (req, res) => {
    try {
        const { id, name } = req.body;
        const data = await model.Report_type.update({
            report_type: name
        }, {
            where: {
                id_report_type: id
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteLoaiHinhBaoCao = async (req, res) => {
    try {
        const id = req.body.id;
        await model.Report_type.destroy({
            where: {
                id_report_type: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addLoaiHinhBaoCao = async (req, res) => {
    try {
        const name = req.body.name;
        const data = await model.Report_type.create({
            report_type: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICHUNG --- Loai Bang Quang Cao
const getLoaiBangQuangCao = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM Board_type ORDER BY id_board_type");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateLoaiBangQuangCao = async (req, res) => {
    try {
        const { id, name } = req.body;
        const data = await model.Board_type.update({
            board_type: name
        }, {
            where: {
                id_board_type: id
            }

        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteLoaiBangQuangCao = async (req, res) => {
    try {
        const id = req.body.id;
        await model.Board_type.destroy({
            where: {
                id_board_type: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addLoaiBangQuangCao = async (req, res) => {
    try {
        const name = req.body.name;
        const data = await model.Board_type.create({
            board_type: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLIQUAN
const getAllQuan = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM District ORDER BY id_district");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllQuanData = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT D.*, COUNT(DISTINCT W.id_ward) AS \"SLPhuong\", COUNT(DISTINCT AL.id_ads_location) AS \"SLDDQC\", COUNT( DISTINCT A.id_ads) AS \"SLBQC\", COUNT(DISTINCT CB.email) AS \"SLCB\" " + 
                                                        "FROM District D " + 
                                                        "LEFT JOIN Ward W ON D.id_district = W.id_district " + 
                                                        "LEFT JOIN Ads_location AL ON AL.id_district = D.id_district " + 
                                                        "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " + 
                                                        "LEFT JOIN CanboQuan CB ON CB.id_district = D.id_district " + 
                                                        "GROUP BY D.id_district " + 
                                                        "ORDER BY D.id_district");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateQuan = async (req, res) => {
    try {
        const { id, name } = req.body;
        const data = await model.District.update({
            district: name
        }, {
            where: {
                id_district: id
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteQuan = async (req, res) => {
    try {
        const id = req.body.id;
        await model.District.destroy({
            where: {
                id_district: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addQuan = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await model.District.create({
            district: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLIPHUONG
const getAllPhuongByIdQuan = async (req, res) => {
    try {
        const id_district = req.params.id_district;
        const [data, metadata] = await sequelize.query(`SELECT id_ward, ward FROM Ward WHERE id_district = '${id_district}' ORDER BY id_ward`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }

}

const getAllPhuongData = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT W.id_ward, W.ward, D.district, COUNT(DISTINCT AL.id_ads_location) AS \"SLDDQC\", COUNT(DISTINCT A.id_ads) AS \"SLBQC\", COUNT(DISTINCT CB.email) AS \"SLCB\" " + 
                                                        "FROM Ward W LEFT JOIN District D ON D.id_district = W.id_district " + 
                                                        "LEFT JOIN Ads_location AL ON AL.id_ward = W.id_ward " + 
                                                        "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " +
                                                        "LEFT JOIN CanboPhuong CB ON CB.id_ward = W.id_ward " +
                                                        "GROUP BY W.id_ward, D.id_district " + 
                                                        "ORDER BY W.id_district, W.id_ward");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updatePhuong = async (req, res) => {
    try {
        const { id, name, id_district } = req.body;
        const data = await model.Ward.update({
            ward: name,
            id_district: id_district
        }, {
            where: {
                id_ward: id
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deletePhuong = async (req, res) => {
    try {
        const id = req.body.id;
        await model.Ward.destroy({
            where: {
                id_ward: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addPhuong = async (req, res) => {
    try {
        const { name, id_district } = req.body;
        const data = await model.Ward.create({
            ward: name, 
            id_district: id_district
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICANBO
const getAllCanboQuan = async (req, res) => {
    try {
        const [data, meta] = await sequelize.query( "SELECT CB.email, CB.fullname, CB.phone, CB.birthdate, D.district " +
                                                    "FROM CanboQuan CB " +
                                                    "INNER JOIN District D ON D.id_district = CB.id_district " + 
                                                    "ORDER BY D.id_district");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllCanboPhuong = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT CB.fullname, CB.birthdate, CB.email, CB.phone, W.ward, D.district " + 
                                                        "FROM CanboPhuong CB " + 
                                                        "INNER JOIN Ward W ON CB.id_ward = W.id_ward " +
                                                        "INNER JOIN District D ON D.id_district = W.id_district " + 
                                                        "ORDER BY D.id_district, W.id_ward ");
        sucessCode(res, data, "Get thành công");                                                        
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllCanboEmail = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT email FROM CanboQuan " + 
                                                        "UNION " + 
                                                        "SELECT email FROM CanboPhuong " + 
                                                        "UNION " + 
                                                        "SELECT email FROM CanboSo");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICANBO - QUAN
const getCanboQuanByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const [data, metadata] = await sequelize.query(`SELECT email, fullname, phone, birthdate, id_district FROM CanboQuan WHERE email = '${email}'`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateCanboQuan = async (req, res) => {
    try {
        const { email, fullname, birthdate, phone, id_district } = req.body;
        const data = await model.CanboQuan.update({
            fullname: fullname,
            phone: phone,
            birthdate: birthdate,
            id_district: id_district
        }, {
            where: {
                email: email
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteCanboQuan = async (req, res) => {
    try {
        const email = req.body.email;
        await model.CanboQuan.destroy({
            where: {
                email: email
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}

const addCanboQuan = async (req, res) => {
    try {
        const { email, fullname, birthdate, phone, id_district } = req.body;
        const data = await model.CanboQuan.create({
            email: email,
            fullname: fullname,
            phone: phone,
            birthdate: birthdate,
            id_district: id_district,
            password: bcrypt.hashSync("123@nhomsau", 10)
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICANBO - PHUONG
const getCanboPhuongByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const [data, metadata] = await sequelize.query(`SELECT P.email, P.fullname, P.phone, P.birthdate, P.id_ward, W.id_district
                                                        FROM CanboPhuong P 
                                                        INNER JOIN Ward W ON W.id_ward = P.id_ward
                                                        WHERE email = '${email}'`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updateCanboPhuong = async (req, res) => {
    try {
        const { email, fullname, birthdate, phone, id_district, id_ward } = req.body;
        const data = await model.CanboPhuong.update({
            fullname: fullname,
            phone: phone,
            birthdate: birthdate,
            id_district: id_district,
            id_ward: id_ward
        }, {
            where: {
                email: email
            }
        });
        sucessCode(res, data, "Put thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const deleteCanboPhuong = async (req, res) => {
    try {
        const email = req.body.email;
        await model.CanboPhuong.destroy({
            where: {
                email: email
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi khóa ngoại");
    }
}


// YEUCAUCHINHSUA
const getAllYeuCauChinhSuaDDQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT R.id_request, R.id_ads_location, R.id_ads, R.id_report_type, R.id_board_type, R.id_loc_type, R.id_ads_type, R.status, R.note, R.date, " +
                                                        "AL.id_district, AL.id_ward, AL.ads_location, AL.ads_location_status, AL.ads_location_note, " +
                                                        "A.ads_name, A.ads_status, A.ads_note, " +
                                                        "RT.report_type, " +
                                                        "BT.board_type, " +
                                                        "LT.loc_type, " +
                                                        "AT.ads_type " +
                                                        "FROM Request R " +
                                                        "INNER JOIN Ads_location AL ON AL.id_ads_location = R.id_ads_location " +
                                                        "INNER JOIN Ads A ON A.id_ads = R.id_ads " +
                                                        "INNER JOIN Report_type RT ON RT.id_report_type = R.id_report_type " +
                                                        "INNER JOIN Board_type BT ON BT.id_board_type = R.id_board_type " +
                                                        "INNER JOIN Location_type LT ON LT.id_loc_type = R.id_loc_type " +
                                                        "INNER JOIN Ads_type AT ON AT.id_ads_type = R.id_ads_type " +
                                                        "ORDER BY R.id_request");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllBaoCaoDDQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.id_ads_location, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        WHERE office = 1
                                                        UNION
                                                        SELECT R.id_report, R.id_ads_location, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        WHERE office = 2
                                                        UNION 
                                                        SELECT R.id_report, R.id_ads_location, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllBaoCaoBQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.id_ads, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        WHERE office = 1
                                                        
                                                        UNION
                                                        
                                                        SELECT R.id_report, R.id_ads, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        WHERE office = 2
                                                        
                                                        UNION 
                                                        
                                                        SELECT R.id_report, R.id_ads, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const getAllBaoCaoDD = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.address, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office = 1
                                                        UNION
                                                        SELECT R.id_report, R.address, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office = 2
                                                        UNION
                                                        SELECT R.id_report, R.address, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

module.exports = { 
    getSoLuongQuan,
    getSoLuongPhuong,
    getSoLuongCanBo,
    getSoLuongDDQC,
    getSoLuongBQC,

    getLoaiViTri, 
    getHinhThucQuangCao, 
    getLoaiHinhBaoCao, 
    getLoaiBangQuangCao,

    updateLoaiViTri,
    updateHinhThucQuangCao,
    updateLoaiHinhBaoCao,
    updateLoaiBangQuangCao,

    deleteLoaiViTri,
    deleteHinhThucQuangCao,
    deleteLoaiHinhBaoCao,
    deleteLoaiBangQuangCao,
    
    addLoaiViTri,
    addHinhThucQuangCao,
    addLoaiHinhBaoCao,
    addLoaiBangQuangCao,

    getAllQuanData,
    updateQuan,
    deleteQuan,
    addQuan,

    getAllPhuongData,
    updatePhuong,
    deletePhuong,
    addPhuong,
    
    getAllQuan,
    getAllPhuongByIdQuan,

    getAllCanboQuan,
    getAllCanboPhuong,
    getAllCanboEmail,

    getCanboQuanByEmail,
    updateCanboQuan,
    deleteCanboQuan,
    addCanboQuan,

    getCanboPhuongByEmail,
    updateCanboPhuong,
    deleteCanboPhuong,
    // addCAnboPhuongByEmail,

    getAllYeuCauChinhSuaDDQC,

    getAllBaoCaoDDQC,
    getAllBaoCaoBQC,
    getAllBaoCaoDD,

};