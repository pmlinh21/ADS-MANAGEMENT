const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

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
        const { id } = parseInt(req.body.id);
        console.log(id);
        await model.Location_type.destroy({
            where: {
                id_loc_type: id
            }
        });
        sucessCode(res, "", "Delete thành công");
    } catch(err) {
        errorCode(res, "Lỗi BE");
    }
}

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

// const updateHinhThucQuangCao = async (req, res) => {
//     try {
//         const id = req.params.idHinhThucQuangCao;
//         const { name } = req.body;
//         const [data, metadata] = await sequelize.query(`UPDATE Ads_type SET ads_type = '${name}' WHERE id_ads_type = ${id}`);
//         sucessCode(res, data, "Put thành công");
//     } catch(err) {
//         errorCode(res, "Lỗi BE");
//     }
// }

// const updateLoaiHinhBaoCao = async (req, res) => {
//     try {
//         const id = req.params.idLoaiHinhBaoCao;
//         const { name } = req.body;
//         const [data, metadata] = await sequelize.query(`UPDATE Report_type SET report_type = '${name}' WHERE id_report_type = ${id}`);
//         sucessCode(res, data, "Put thành công");
//     } catch(err) {
//         errorCode(res, "Lỗi BE");
//     }
// }

// const updateLoaiBangQuangCao = async (req, res) => {
//     try {
//         const id = req.params.idLoaiBangQuangCao;
//         const { name } = req.body;
//         const [data, metadata] = await sequelize.query(`UPDATE Board_type SET board_type = '${name}' WHERE id_board_type = ${id}`);
//         sucessCode(res, data, "Put thành công");
//     } catch(err) {
//         errorCode(res, "Lỗi BE");
//     }
// }

module.exports = { 
    getLoaiViTri, 
    getHinhThucQuangCao, 
    getLoaiHinhBaoCao, 
    getLoaiBangQuangCao,
    updateLoaiViTri,
    updateHinhThucQuangCao,
    updateLoaiHinhBaoCao,
    updateLoaiBangQuangCao,
    deleteLoaiViTri
};