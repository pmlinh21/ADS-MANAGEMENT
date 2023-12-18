const express = require('express');
const soRoute = express.Router();
const { 
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
    getAllQuanData,
    updateQuan,
    deleteQuan,
    addQuan,

    getAllPhuongByIdQuan,
    getAllPhuongData,
    updatePhuong,
    deletePhuong,
    addPhuong,

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

    getAllDiemDatQuangCao,

    getAllBangQuangCao,

    getAllYeuCauChinhSuaDDQC,
    getAllYeuCauChinhSuaBQC,

    getAllYeuCauCapPhep,

    getAllBaoCaoDDQC,
    getAllBaoCaoBQC,
    getAllBaoCaoDD,

    getBaoCaoBQCById,
    getBaoCaoDDQCById,

} = require('../controllers/soController')

// const { upload } = require('../middlewares/upload');
// const { isCanboSo } = require('../middlewares/baseToken');

// QUANLICHUNG
soRoute.get("/getSoLuongQuan", getSoLuongQuan);
soRoute.get("/getSoLuongPhuong", getSoLuongPhuong);
soRoute.get("/getSoLuongCanBo", getSoLuongCanBo);
soRoute.get("/getSoLuongDDQC", getSoLuongDDQC);
soRoute.get("/getSoLuongBQC", getSoLuongBQC);

soRoute.get("/getLoaiViTri", getLoaiViTri);
soRoute.get("/getHinhThucQuangCao", getHinhThucQuangCao);
soRoute.get("/getLoaiHinhBaoCao", getLoaiHinhBaoCao);
soRoute.get("/getLoaiBangQuangCao", getLoaiBangQuangCao);

soRoute.put("/updateLoaiViTri", updateLoaiViTri);
soRoute.put("/updateHinhThucQuangCao", updateHinhThucQuangCao);
soRoute.put("/updateLoaiHinhBaoCao", updateLoaiHinhBaoCao);
soRoute.put("/updateLoaiBangQuangCao", updateLoaiBangQuangCao);

soRoute.delete("/deleteLoaiViTri", deleteLoaiViTri);
soRoute.delete("/deleteHinhThucQuangCao", deleteHinhThucQuangCao);
soRoute.delete("/deleteLoaiHinhBaoCao", deleteLoaiHinhBaoCao);
soRoute.delete("/deleteLoaiBangQuangCao", deleteLoaiBangQuangCao);

soRoute.post("/addLoaiViTri", addLoaiViTri);
soRoute.post("/addHinhThucQuangCao", addHinhThucQuangCao);
soRoute.post("/addLoaiHinhBaoCao", addLoaiHinhBaoCao);
soRoute.post("/addLoaiBangQuangCao", addLoaiBangQuangCao);

// QUANLIQUAN
soRoute.get("/getAllQuan", getAllQuan);
soRoute.get("/getAllQuanData", getAllQuanData);
soRoute.put("/updateQuan", updateQuan);
soRoute.delete("/deleteQuan", deleteQuan);
soRoute.post("/addQuan", addQuan);

// QUANLIPHUONG
soRoute.get("/getAllPhuongByIdQuan/:id_district", getAllPhuongByIdQuan);
soRoute.get("/getAllPhuongData", getAllPhuongData);
soRoute.put("/updatePhuong", updatePhuong);
soRoute.delete("/deletePhuong", deletePhuong);
soRoute.post("/addPhuong", addPhuong);

// QUANLICANBO
soRoute.get("/getAllCanboQuan", getAllCanboQuan);
soRoute.get("/getAllCanboPhuong", getAllCanboPhuong);
soRoute.get("/getAllCanboEmail", getAllCanboEmail);

soRoute.get("/getCanboQuanByEmail/:email", getCanboQuanByEmail);
soRoute.get("/getCanboPhuongByEmail/:email", getCanboPhuongByEmail);

soRoute.put("/updateCanboQuan", updateCanboQuan);
soRoute.put("/updateCanboPhuong", updateCanboPhuong);

soRoute.delete("/deleteCanboQuan", deleteCanboQuan);
soRoute.delete("/deleteCanboPhuong", deleteCanboPhuong);

soRoute.put("/addCanboQuan", addCanboQuan);

// DIEMDATQUANGCAO
soRoute.get("/getAllDiemDatQuangCao", getAllDiemDatQuangCao);

// BANGQUANGCAO
soRoute.get("/getAllBangQuangCao", getAllBangQuangCao);

// YEUCAUCHINHSUA
soRoute.get("/getAllYeuCauChinhSuaDDQC", getAllYeuCauChinhSuaDDQC);
soRoute.get("/getAllYeuCauChinhSuaBQC", getAllYeuCauChinhSuaBQC);

// YEUCAUCAPPHEP
soRoute.get("/getAllYeuCauCapPhep", getAllYeuCauCapPhep);

// THONGKEBAOCAO
soRoute.get("/getAllBaoCaoDDQC", getAllBaoCaoDDQC);
soRoute.get("/getAllBaoCaoBQC", getAllBaoCaoBQC);
soRoute.get("/getAllBaoCaoDD", getAllBaoCaoDD);

soRoute.get("/getBaoCaoBQCById/:id", getBaoCaoBQCById);
soRoute.get("/getBaoCaoDDQCById/:id", getBaoCaoDDQCById);

module.exports = soRoute;