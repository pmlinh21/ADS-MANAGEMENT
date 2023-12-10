const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

// QUANLICHUNG --- Statistic
const getSoLuongQuan = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_district) AS soLuongQuan FROM District");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongPhuong = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ward) AS soLuongPhuong FROM Ward");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongCanBo = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(T.email) AS soLuongCanBo FROM ( (SELECT email FROM CanboSo) UNION (SELECT email FROM CanboQuan ) UNION (SELECT email FROM CanboPhuong)) T");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongDDQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ads_location) AS soLuongDDQC FROM Ads_location");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

const getSoLuongBQC = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT COUNT(id_ads) AS soLuongBQC FROM Ads");
        sucessCode(res, data, "Get thành công");
    } catch (err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLICHUNG --- Loai Vi Tri
const getLoaiViTri = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query("SELECT * FROM Location_type");
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
        const [data, metadata] = await sequelize.query("SELECT * FROM Ads_type");
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
        const [data, metadata] = await sequelize.query("SELECT * FROM Report_type");
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
        const [data, metadata] = await sequelize.query("SELECT * FROM Board_type");
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
        const [data, metadata] = await sequelize.query( "SELECT D.*, COUNT(DISTINCT W.id_ward) AS SLPhuong, COUNT(DISTINCT AL.id_ads_location) AS SLDDQC, COUNT( DISTINCT A.id_ads) AS SLBQC, COUNT(DISTINCT CB.email) AS SLCB " + 
                                                        "FROM District D " + 
                                                        "LEFT JOIN Ward W ON D.id_district = W.id_district " + 
                                                        "LEFT JOIN Ads_location AL ON AL.id_district = D.id_district " + 
                                                        "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " + 
                                                        "LEFT JOIN CanboQuan CB ON CB.id_district = D.id_district " + 
                                                        "GROUP BY D.id_district");
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
        sucessCode(res, data, req.body.name);
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
        const name = req.body.name;
        const data = await model.District.create({
            district: name
        });
        sucessCode(res, data, "Post thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

// QUANLIPHUONG
const getAllPhuong = async (req, res) => {
    try {
        const [data, metadata] = await sequelize.query( "SELECT W.id_ward, W.ward, D.district, COUNT(DISTINCT AL.id_ads_location) AS SLDDQC, COUNT(DISTINCT A.id_ads) AS SLBQC " + 
                                                        "FROM Ward W LEFT JOIN District D ON D.id_district = W.id_district " + 
                                                        "LEFT JOIN Ads_location AL ON AL.id_ward = W.id_ward " + 
                                                        "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " + 
                                                        "GROUP BY W.id_ward");
        sucessCode(res, data, "Get thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

const updatePhuong = async (req, res) => {
    try {
        const { id, name } = req.body;
        const data = await model.Ward.update({
            ward: name
        }, {
            where: {
                id_ward: id
            }
        });
        sucessCode(res, data, req.body.name);
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
        const name = req.body.name;
        const data = await model.Ward.create({
            ward: name
        });
        sucessCode(res, data, "Post thành công");
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

    getAllQuan,
    updateQuan,
    deleteQuan,
    addQuan,

    getAllPhuong,
    updatePhuong,
    deletePhuong,
    addPhuong
};