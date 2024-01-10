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
    addCanboPhuong,

    getAllDiemDatQuangCao,
    getDiemDatQuangCaoById,
    getAllAdsLocations,
    updateDiemDatQuangCao,
    deleteDiemDatQuangCao,
    addDiemDatQuangCao,
    getQuanByName,
    getPhuongByNameAndIdQuan,

    getAllBangQuangCao,
    getBangQuangCaoById,
    updateBangQuangCao,
    deleteBangQuangCao,

    getAllYeuCauChinhSuaDDQC,
    getAllYeuCauChinhSuaBQC,
    getYeuCauChinhSuaDDQCById,
    getYeuCauChinhSuaBQCById,

    updateYeuCauChinhSuaDDQC,
    updateYeuCauChinhSuaBQC,

    getAllYeuCauCapPhep,
    getYeuCauCapPhepById,
    updateYeuCauCapPhep,
    createBangQuangCao,
    getAdsCreateByIdAdsNotIdCreate,
    updateAdsExpiredDate,

    getAllBaoCaoDDQC,
    getAllBaoCaoBQC,
    getAllBaoCaoDD,

    getBaoCaoBQCById,
    getBaoCaoDDQCById,
    getBaoCaoDDById,

    getMapInfo,

} = require('../controllers/soController')

const cookieParser = require("cookie-parser");
soRoute.use(cookieParser(process.env.JWT_SECRET_KEY))
const { upload, uploadNone } = require('../middlewares/upload');
const { isCanboSo } = require('../middlewares/baseToken');
// const { isCanboSo } = require('../middlewares/baseToken');

// QUANLICHUNG
soRoute.get("/getSoLuongQuan", isCanboSo, getSoLuongQuan);
soRoute.get("/getSoLuongPhuong", isCanboSo, getSoLuongPhuong);
soRoute.get("/getSoLuongCanBo", isCanboSo, getSoLuongCanBo);
soRoute.get("/getSoLuongDDQC", isCanboSo, getSoLuongDDQC);
soRoute.get("/getSoLuongBQC", isCanboSo, getSoLuongBQC);

soRoute.get("/getLoaiViTri", isCanboSo, getLoaiViTri);
soRoute.get("/getHinhThucQuangCao", isCanboSo, getHinhThucQuangCao);
soRoute.get("/getLoaiHinhBaoCao", isCanboSo, getLoaiHinhBaoCao);
soRoute.get("/getLoaiBangQuangCao", isCanboSo, getLoaiBangQuangCao);

soRoute.put("/updateLoaiViTri", isCanboSo, updateLoaiViTri);
soRoute.put("/updateHinhThucQuangCao", isCanboSo, updateHinhThucQuangCao);
soRoute.put("/updateLoaiHinhBaoCao", isCanboSo, updateLoaiHinhBaoCao);
soRoute.put("/updateLoaiBangQuangCao", isCanboSo, updateLoaiBangQuangCao);

soRoute.delete("/deleteLoaiViTri", isCanboSo, deleteLoaiViTri);
soRoute.delete("/deleteHinhThucQuangCao", isCanboSo, deleteHinhThucQuangCao);
soRoute.delete("/deleteLoaiHinhBaoCao", isCanboSo, deleteLoaiHinhBaoCao);
soRoute.delete("/deleteLoaiBangQuangCao", isCanboSo, deleteLoaiBangQuangCao);

soRoute.post("/addLoaiViTri", isCanboSo, addLoaiViTri);
soRoute.post("/addHinhThucQuangCao", isCanboSo, addHinhThucQuangCao);
soRoute.post("/addLoaiHinhBaoCao", isCanboSo, addLoaiHinhBaoCao);
soRoute.post("/addLoaiBangQuangCao", isCanboSo, addLoaiBangQuangCao);

// QUANLIQUAN
soRoute.get("/getAllQuan", isCanboSo, getAllQuan);
soRoute.get("/getAllQuanData", isCanboSo, getAllQuanData);
soRoute.put("/updateQuan", isCanboSo, updateQuan);
soRoute.delete("/deleteQuan", isCanboSo, deleteQuan);
soRoute.post("/addQuan", isCanboSo, addQuan);

// QUANLIPHUONG
soRoute.get("/getAllPhuongByIdQuan/:id_district", isCanboSo, getAllPhuongByIdQuan);
soRoute.get("/getAllPhuongData", isCanboSo, getAllPhuongData);
soRoute.put("/updatePhuong", isCanboSo, updatePhuong);
soRoute.delete("/deletePhuong", isCanboSo, deletePhuong);
soRoute.post("/addPhuong", isCanboSo, addPhuong);

// QUANLICANBO
soRoute.get("/getAllCanboQuan", isCanboSo, getAllCanboQuan);
soRoute.get("/getAllCanboPhuong", isCanboSo, getAllCanboPhuong);
soRoute.get("/getAllCanboEmail", isCanboSo, getAllCanboEmail);

soRoute.get("/getCanboQuanByEmail/:email", isCanboSo, getCanboQuanByEmail);
soRoute.get("/getCanboPhuongByEmail/:email", isCanboSo, getCanboPhuongByEmail);

soRoute.put("/updateCanboQuan", isCanboSo, updateCanboQuan);
soRoute.put("/updateCanboPhuong", isCanboSo, updateCanboPhuong);

soRoute.delete("/deleteCanboQuan", isCanboSo, deleteCanboQuan);
soRoute.delete("/deleteCanboPhuong", isCanboSo, deleteCanboPhuong);

soRoute.post("/addCanboQuan", isCanboSo, addCanboQuan);
soRoute.post("/addCanboPhuong", isCanboSo, addCanboPhuong);

// DIEMDATQUANGCAO
soRoute.get("/getAllDiemDatQuangCao", isCanboSo, getAllDiemDatQuangCao);
soRoute.get("/getDiemDatQuangCaoById/:id", isCanboSo, getDiemDatQuangCaoById);
soRoute.get("/getAllAdsLocations", isCanboSo, getAllAdsLocations);
soRoute.put("/updateDiemDatQuangCao", isCanboSo, updateDiemDatQuangCao); 
soRoute.delete("/deleteDiemDatQuangCao", isCanboSo, deleteDiemDatQuangCao);
soRoute.post("/addDiemDatQuangCao", isCanboSo, addDiemDatQuangCao);
soRoute.get("/getQuanByName/:name", isCanboSo, getQuanByName);
soRoute.get("/getPhuongByNameAndIdQuan/:name/:id_district", isCanboSo, getPhuongByNameAndIdQuan);

// BANGQUANGCAO
soRoute.get("/getAllBangQuangCao", isCanboSo, getAllBangQuangCao);
soRoute.get("/getBangQuangCaoById/:id", isCanboSo, getBangQuangCaoById);
soRoute.put("/updateBangQuangCao", isCanboSo, updateBangQuangCao);
soRoute.delete("/deleteBangQuangCao", isCanboSo, deleteBangQuangCao);

// YEUCAUCHINHSUA
soRoute.get("/getAllYeuCauChinhSuaDDQC", isCanboSo, getAllYeuCauChinhSuaDDQC);
soRoute.get("/getAllYeuCauChinhSuaBQC", isCanboSo, getAllYeuCauChinhSuaBQC);
soRoute.get("/getYeuCauChinhSuaDDQCById/:id", isCanboSo, getYeuCauChinhSuaDDQCById);
soRoute.get("/getYeuCauChinhSuaBQCById/:id", isCanboSo, getYeuCauChinhSuaBQCById);
soRoute.put("/updateYeuCauChinhSuaDDQC/:id/:status", isCanboSo, updateYeuCauChinhSuaDDQC);
soRoute.put("/updateYeuCauChinhSuaBQC/:id/:status", isCanboSo, updateYeuCauChinhSuaBQC);

// YEUCAUCAPPHEP
soRoute.get("/getAllYeuCauCapPhep", isCanboSo, getAllYeuCauCapPhep);
soRoute.get("/getYeuCauCapPhepById/:id", isCanboSo, getYeuCauCapPhepById);
soRoute.put("/updateYeuCauCapPhep/:id/:status", isCanboSo, updateYeuCauCapPhep);
soRoute.post("/createBangQuangCao", isCanboSo, createBangQuangCao);
soRoute.get("/getAdsCreateByIdAdsNotIdCreate/:id/:id_create", isCanboSo, getAdsCreateByIdAdsNotIdCreate);
soRoute.put("/updateAdsExpiredDate", isCanboSo, updateAdsExpiredDate);

// THONGKEBAOCAO
soRoute.get("/getAllBaoCaoDDQC", isCanboSo, getAllBaoCaoDDQC);
soRoute.get("/getAllBaoCaoBQC", isCanboSo, getAllBaoCaoBQC);
soRoute.get("/getAllBaoCaoDD", isCanboSo, getAllBaoCaoDD);

soRoute.get("/getBaoCaoBQCById/:id", isCanboSo, getBaoCaoBQCById);
soRoute.get("/getBaoCaoDDQCById/:id", isCanboSo, getBaoCaoDDQCById);
soRoute.get("/getBaoCaoDDById/:id", isCanboSo, getBaoCaoDDById);

// MAP
soRoute.get("/getMapInfo", getMapInfo);
module.exports = soRoute;