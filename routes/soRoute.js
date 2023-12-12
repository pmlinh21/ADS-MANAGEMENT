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
    updateQuan,
    deleteQuan,
    addQuan,

    getAllPhuong,
    updatePhuong,
    deletePhuong,
    addPhuong,

    getAllCanboQuan,
    getAllCanboPhuong
} = require('../controllers/soController')

// const { upload } = require('../middlewares/upload');

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
soRoute.put("/updateQuan", updateQuan);
soRoute.delete("/deleteQuan", deleteQuan);
soRoute.post("/addQuan", addQuan);

// QUANLIPHUONG
soRoute.get("/getAllPhuong", getAllPhuong);
soRoute.put("/updatePhuong", updatePhuong);
soRoute.delete("/deletePhuong", deletePhuong);
soRoute.post("/addPhuong", addPhuong);

// QUANLICANBO
soRoute.get("/getAllCanboQuan", getAllCanboQuan);
soRoute.get("/getAllCanboPhuong", getAllCanboPhuong);

module.exports = soRoute;