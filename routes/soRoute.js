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
    deleteLoaiViTri,
    deleteHinhThucQuangCao,
    deleteLoaiHinhBaoCao,
    deleteLoaiBangQuangCao,
    addLoaiViTri,
    addHinhThucQuangCao,
    addLoaiHinhBaoCao,
    addLoaiBangQuangCao
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

soRoute.delete("/deleteHinhThucQuangCao", deleteHinhThucQuangCao);

soRoute.delete("/deleteLoaiHinhBaoCao", deleteLoaiHinhBaoCao);

soRoute.delete("/deleteLoaiBangQuangCao", deleteLoaiBangQuangCao);

soRoute.post("/addLoaiViTri", addLoaiViTri);

soRoute.post("/addHinhThucQuangCao", addHinhThucQuangCao);

soRoute.post("/addLoaiHinhBaoCao", addLoaiHinhBaoCao);

soRoute.post("/addLoaiBangQuangCao", addLoaiBangQuangCao);

module.exports = soRoute;