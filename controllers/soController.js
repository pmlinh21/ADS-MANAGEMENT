const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

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
        sucessCode(res, data, name);
    } catch(err) {
        errorCode(res, req.body.name);
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
        sucessCode(res, data, name);
    } catch(err) {
        errorCode(res, req.body.name);
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
        sucessCode(res, data, name);
    } catch(err) {
        errorCode(res, req.body.name);
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
        sucessCode(res, data, name);
    } catch(err) {
        errorCode(res, req.body.name);
    }
}

module.exports = { 
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
    addLoaiBangQuangCao
};