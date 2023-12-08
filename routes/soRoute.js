const express = require('express');
const soRoute = express.Router();
const { getLoaiViTri, 
    getHinhThucQuangCao, 
    getLoaiHinhBaoCao, 
    getLoaiBangQuangCao,
    updateLoaiViTri,
    updateHinhThucQuangCao,
    updateLoaiHinhBaoCao,
    updateLoaiBangQuangCao,
    deleteLoaiViTri
    } = require('../controllers/soController')
// const { upload } = require('../middlewares/upload');

soRoute.get("/getLoaiViTri", getLoaiViTri);

soRoute.get("/getHinhThucQuangCao", getHinhThucQuangCao);

soRoute.get("/getLoaiHinhBaoCao", getLoaiHinhBaoCao);

soRoute.get("/getLoaiBangQuangCao", getLoaiBangQuangCao);

soRoute.put("/updateLoaiViTri", updateLoaiViTri);

soRoute.put("/updateHinhThucQuangCao", updateHinhThucQuangCao);

soRoute.put("/updateLoaiHinhBaoCao", updateLoaiHinhBaoCao);

soRoute.put("/updateLoaiBangQuangCao", updateLoaiBangQuangCao);

soRoute.delete("/deleteLoaiViTri", deleteLoaiViTri);

module.exports = soRoute;