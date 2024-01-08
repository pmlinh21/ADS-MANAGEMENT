const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const { deleteImage } = require('../middlewares/deleteImage');

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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLICHUNG --- Hinh Thuc Quang Cao
const getHinhThucQuangCao = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT * FROM Ads_type ORDER BY id_ads_type");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }

}

// QUANLICHUNG --- Loai Hinh Bao Cao
const getLoaiHinhBaoCao = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT * FROM Report_type ORDER BY id_report_type");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLICHUNG --- Loai Bang Quang Cao
const getLoaiBangQuangCao = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT * FROM Board_type ORDER BY id_board_type");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLIQUAN
const getAllQuan = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT * FROM District ORDER BY id_district");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllQuanData = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT D.*, COUNT(DISTINCT W.id_ward) AS \"SLPhuong\", COUNT(DISTINCT AL.id_ads_location) AS \"SLDDQC\", COUNT( DISTINCT A.id_ads) AS \"SLBQC\", COUNT(DISTINCT CB.email) AS \"SLCB\" " +
      "FROM District D " +
      "LEFT JOIN Ward W ON D.id_district = W.id_district " +
      "LEFT JOIN Ads_location AL ON AL.id_district = D.id_district " +
      "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " +
      "LEFT JOIN CanboQuan CB ON CB.id_district = D.id_district " +
      "GROUP BY D.id_district " +
      "ORDER BY D.id_district");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLIPHUONG
const getAllPhuongByIdQuan = async (req, res) => {
  try {
    const id_district = req.params.id_district;
    const [data, metadata] = await sequelize.query(`SELECT id_ward, ward FROM Ward WHERE id_district = '${id_district}' ORDER BY id_ward`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }

}

const getAllPhuongData = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT W.id_ward, W.ward, D.district, COUNT(DISTINCT AL.id_ads_location) AS \"SLDDQC\", COUNT(DISTINCT A.id_ads) AS \"SLBQC\", COUNT(DISTINCT CB.email) AS \"SLCB\" " +
      "FROM Ward W LEFT JOIN District D ON D.id_district = W.id_district " +
      "LEFT JOIN Ads_location AL ON AL.id_ward = W.id_ward " +
      "LEFT JOIN Ads A ON A.id_ads_location = AL.id_ads_location " +
      "LEFT JOIN CanboPhuong CB ON CB.id_ward = W.id_ward " +
      "GROUP BY W.id_ward, D.id_district " +
      "ORDER BY W.id_district, W.id_ward");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLICANBO
const getAllCanboQuan = async (req, res) => {
  try {
    const [data, meta] = await sequelize.query("SELECT CB.email, CB.fullname, CB.phone, CB.birthdate, D.district " +
      "FROM CanboQuan CB " +
      "INNER JOIN District D ON D.id_district = CB.id_district " +
      "ORDER BY D.id_district");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllCanboPhuong = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT CB.fullname, CB.birthdate, CB.email, CB.phone, W.ward, D.district " +
      "FROM CanboPhuong CB " +
      "INNER JOIN Ward W ON CB.id_ward = W.id_ward " +
      "INNER JOIN District D ON D.id_district = W.id_district " +
      "ORDER BY D.id_district, W.id_ward ");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllCanboEmail = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query("SELECT email FROM CanboQuan " +
      "UNION " +
      "SELECT email FROM CanboPhuong " +
      "UNION " +
      "SELECT email FROM CanboSo");
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// QUANLICANBO - QUAN
const getCanboQuanByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const [data, metadata] = await sequelize.query(`SELECT email, fullname, phone, birthdate, id_district FROM CanboQuan WHERE email = '${email}'`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    errorCode(res, "Lỗi khóa ngoại");
  }
}

const addCanboPhuong = async (req, res) => {
  try {
    const { email, fullname, birthdate, phone, id_district, id_ward } = req.body;
    const data = await model.CanboPhuong.create({
      email: email,
      fullname: fullname,
      phone: phone,
      birthdate: birthdate,
      id_ward: id_ward,
      password: bcrypt.hashSync("123@nhomsau", 10)
    });
    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// DIEMDATQUANGCAO
const getAllDiemDatQuangCao = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`SELECT L.id_ads_location, L.address, W.ward, D.district, T.loc_type, A.ads_type, L.is_zoning
                                                    FROM Ads_location L
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    LEFT JOIN Location_type T ON T.id_loc_type = L.id_loc_type
                                                    LEFT JOIN Ads_type A ON A.id_ads_type = L.id_ads_type
                                                    ORDER BY L.id_ads_location`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getDiemDatQuangCaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data, metadata] = await sequelize.query( `SELECT L.id_ads_location, L.latitude, L.longitude, L.address, L.id_ward, L.id_district, W.ward, D.district, L.id_loc_type, LT.loc_type, L.photo, L.id_ads_type, AT.ads_type, L.is_zoning
                                                    FROM Ads_location L
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    LEFT JOIN Location_type LT ON LT.id_loc_type = L.id_loc_type
                                                    LEFT JOIN Ads_type AT ON AT.id_ads_type = L.id_ads_type
                                                    WHERE L.id_ads_location = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const updateDiemDatQuangCao = async (req, res) => {
  try {
    let { id_ads_location, address, ward, district, latitude, longitude, id_loc_type, id_ads_type, is_zoning, old_photo, photo } = req.body;

    const data = await model.Ads_location.update({
      address: address,
      id_ward: ward,
      id_district: district,
      latitude: latitude,
      longitude: longitude,
      id_loc_type: id_loc_type,
      id_ads_type: id_ads_type,
      is_zoning: is_zoning,
      photo: photo
    }, {
      where: {
        id_ads_location: id_ads_location
      }
    })

    if (photo != old_photo) {
      deleteImage(old_photo);
    }

    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const deleteDiemDatQuangCao = async (req, res) => {
  try {
    deleteImage(req.body.photo);
    const id = req.body.id;
    await model.Ads_location.destroy({
      where: {
        id_ads_location: id
      }
    });
    sucessCode(res, "", "Delete thành công");
  } catch (err) {
    errorCode(res, "Lỗi khóa ngoại");
  }
}

// BANGQUANGCAO
const getAllBangQuangCao = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`SELECT A.id_ads, A.id_ads_location, L.address, W.ward, D.district, B.board_type, A.expired_date
                                                    FROM Ads A 
                                                    LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    LEFT JOIN Board_type B ON B.id_board_type = A.id_board_type
                                                    ORDER BY id_ads`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getBangQuangCaoById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data, metadata] = await sequelize.query( `SELECT A.id_ads, A.id_ads_location, A.id_board_type, B.board_type, A.width, A.height, A.photo, A.quantity, A.expired_date
                                                    FROM Ads A 
                                                    LEFT JOIN Board_type B ON B.id_board_type = A.id_board_type
                                                    WHERE A.id_ads = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllAdsLocations = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`SELECT L.id_ads_location, L.latitude, L.longitude, L.address, L.id_ward, W.ward, W.id_district, D.district
                                                    FROM Ads_location L
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district`);

                                                    // WHERE L.is_zoning = true`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const updateBangQuangCao = async (req, res) => {
  try {
    let { id_ads, id_ads_location, id_board_type, width, height, quantity, expired_date, old_photo, photo } = req.body;

    const data = await model.Ads.update({
      id_ads_location: id_ads_location,
      id_board_type: id_board_type,
      width: width,
      height: height,
      quantity: quantity,
      expired_date: expired_date,
      photo: photo
    }, {
      where: {
        id_ads: id_ads
      }
    })

    if (photo != old_photo) {
      deleteImage(old_photo);
    }

    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const deleteBangQuangCao = async (req, res) => {
  try {
    deleteImage(req.body.photo);
    const id = req.body.id;
    await model.Ads.destroy({
      where: {
        id_ads: id
      }
    });
    sucessCode(res, "", "Delete thành công");
  } catch (err) {
    errorCode(res, "Lỗi khóa ngoại");
  }
}

// YEUCAUCHINHSUA
const getAllYeuCauChinhSuaDDQC = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`(SELECT U.id_req, U.id_ads_location, L.address, W.ward AS address_ward, D.district AS address_district, U.req_time, NULL AS ward, D1.district AS district, U.status
                                                        FROM Ads_loc_update U
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = U.id_ads_location
                                                        LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN CanboQuan C ON C.email = U.officer
                                                        LEFT JOIN District D1 ON D1.id_district = C.id_district
                                                        WHERE U.office = 1
                                                        UNION 
                                                        SELECT U.id_req, U.id_ads_location, L.address, W.ward AS address_ward, D.district AS address_district, U.req_time, W1.ward AS ward, D1.district AS district, U.status
                                                        FROM Ads_loc_update U
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = U.id_ads_location
                                                        LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN CanboPhuong C ON C.email = U.officer
                                                        LEFT JOIN Ward W1 ON W1.id_ward = C.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE U.office = 2
                                                        UNION
                                                        SELECT U.id_req, U.id_ads_location, L.address, W.ward AS address_ward, D.district AS address_district, U.req_time, NULL AS ward, NULL AS district, U.status
                                                        FROM Ads_loc_update U
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = U.id_ads_location
                                                        LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        WHERE U.office IS NULL)
                                                        ORDER BY id_req DESC`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllYeuCauChinhSuaBQC = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`(SELECT U.id_req, U.id_ads, L.address, W.ward AS address_ward, D.district AS address_district, U.req_time, NULL AS ward, D1.district AS district, U.status
                                                        FROM Ads_update U
                                                        LEFT JOIN Ads A ON A.id_ads = U.id_ads
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                        LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN CanboQuan C ON C.email = U.officer
                                                        LEFT JOIN District D1 ON D1.id_district = C.id_district
                                                        WHERE U.office = 1
                                                        UNION 
                                                        SELECT U.id_req, U.id_ads, L.address, W.ward AS address_ward, D.district AS address_district, U.req_time, W1.ward AS ward, D1.district AS district, U.status
                                                        FROM Ads_update U
                                                        LEFT JOIN Ads A ON A.id_ads = U.id_ads
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                        LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN CanboPhuong C ON C.email = U.officer
                                                        LEFT JOIN Ward W1 ON W1.id_ward = C.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE U.office = 2)
                                                        ORDER BY id_req DESC`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getYeuCauChinhSuaDDQCById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data, metadata] = await sequelize.query(`SELECT U.*, L.loc_type, A.ads_type, W.ward AS address_ward, D.district AS address_district, D1.district, NULL AS ward
                                                    FROM Ads_loc_update U
                                                    LEFT JOIN Location_type L ON L.id_loc_type = U.id_loc_type
                                                    LEFT JOIN Ads_type A ON A.id_ads_type = U.id_ads_type
                                                    LEFT JOIN Ward W ON W.id_ward = U.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    INNER JOIN CanboQuan CB ON CB.email = U.officer
                                                    LEFT JOIN District D1 ON D1.id_district = CB.id_district
                                                    WHERE U.id_req = ${id}
                                                    UNION
                                                    SELECT U.*, L.loc_type, A.ads_type, W.ward AS address_ward, D.district AS address_district, D1.district, W1.ward
                                                    FROM Ads_loc_update U
                                                    LEFT JOIN Location_type L ON L.id_loc_type = U.id_loc_type
                                                    LEFT JOIN Ads_type A ON A.id_ads_type = U.id_ads_type
                                                    LEFT JOIN Ward W ON W.id_ward = U.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    INNER JOIN CanboPhuong CB ON CB.email = U.officer
                                                    LEFT JOIN Ward W1 ON W1.id_ward = CB.id_ward
                                                    LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                    WHERE U.id_req = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}


const getYeuCauChinhSuaBQCById = async (req, res) => {
  try {
    const id = req.params.id;
    const[data, meta] = await sequelize.query(`SELECT U.*, B.board_type, D.district, NULL AS ward
                                              FROM Ads_update U
                                              INNER JOIN Board_type B ON B.id_board_type = U.id_board_type
                                              INNER JOIN CanboQuan CB ON CB.email = U.officer
                                              INNER JOIN District D ON D.id_district = CB.id_district
                                              WHERE U.id_req = ${id}
                                              UNION
                                              SELECT U.*, B.board_type, D.district, W.ward
                                              FROM Ads_update U
                                              INNER JOIN Board_type B ON B.id_board_type = U.id_board_type
                                              INNER JOIN CanboPhuong CB ON CB.email = U.officer
                                              INNER JOIN Ward W ON W.id_ward = CB.id_ward
                                              INNER JOIN District D ON D.id_district = W.id_district
                                              WHERE U.id_req = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const updateYeuCauChinhSuaDDQC = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;
    [data, meta] = await sequelize.query(`UPDATE Ads_loc_update SET status = ${status} WHERE id_req = ${id}`);
    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const updateYeuCauChinhSuaBQC = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;
    [data, meta] = await sequelize.query(`UPDATE Ads_update SET status = ${status} WHERE id_req = ${id}`);
    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// YEUCAUCAPPHEP
const getAllYeuCauCapPhep = async (req, res) => {
  try {
    [data, metadata] = await sequelize.query(`(SELECT C.id_create, C.company, C.start_date, C.end_date, D1.district, NULL AS ward, C.status, L.address, W.ward AS address_ward, D.district AS address_district
                                                    FROM Ads_create C
                                                    LEFT JOIN Ads_location L ON L.id_ads_location = C.id_ads_location
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    LEFT JOIN CanboQuan CB ON CB.email = C.officer
                                                    LEFT JOIN District D1 ON D1.id_district = CB.id_district
                                                    WHERE C.office = 1
                                                    UNION
                                                    SELECT C.id_create, C.company, C.start_date, C.end_date, D1.district, W1.ward, C.status, L.address, W.ward AS address_ward, D.district AS address_district
                                                    FROM Ads_create C
                                                    LEFT JOIN Ads_location L ON L.id_ads_location = C.id_ads_location
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    LEFT JOIN CanboPhuong CB ON CB.email = C.officer
                                                    LEFT JOIN Ward W1 ON W1.id_ward = CB.id_ward
                                                    LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                    WHERE C.office = 2
                                                    UNION
                                                    SELECT C.id_create, C.company, C.start_date, C.end_date, NULL AS district, NULL AS ward, C.status, L.address, W.ward AS address_ward, D.district AS address_district
                                                    FROM Ads_create C
                                                    LEFT JOIN Ads_location L ON L.id_ads_location = C.id_ads_location
                                                    LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                                    LEFT JOIN District D ON D.id_district = W.id_district
                                                    WHERE C.office IS NULL)
                                                    ORDER BY id_create DESC`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getYeuCauCapPhepById = async (req, res) => {
  try {
    const id = req.params.id;
    [data, metadata] = await sequelize.query(`SELECT C.*, B.board_type, L.address AS ads_location, W.ward AS address_ward, D.district AS address_district, D1.district, NULL AS ward
                                              FROM Ads_create C
                                              LEFT JOIN Board_type B ON B.id_board_type = C.id_board_type
                                              LEFT JOIN Ads_location L ON L.id_ads_location = C.id_ads_location
                                              LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                              LEFT JOIN District D ON D.id_district = W.id_district
                                              INNER JOIN CanboQuan CB ON CB.email = C.officer
                                              LEFT JOIN District D1 ON D1.id_district = CB.id_district
                                              WHERE C.id_create = ${id}
                                              UNION
                                              SELECT C.*, B.board_type, L.address AS ads_location, W.ward AS address_ward, D.district AS address_district, D1.district, W1.ward
                                              FROM Ads_create C
                                              LEFT JOIN Board_type B ON B.id_board_type = C.id_board_type
                                              LEFT JOIN Ads_location L ON L.id_ads_location = C.id_ads_location
                                              LEFT JOIN Ward W ON W.id_ward = L.id_ward
                                              LEFT JOIN District D ON D.id_district = W.id_district
                                              INNER JOIN CanboPhuong CB ON CB.email = C.officer
                                              LEFT JOIN Ward W1 ON W1.id_ward = CB.id_ward
                                              LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                              WHERE C.id_create = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const updateYeuCauCapPhep = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.params.status;
    const id_ads = req.params.id_ads;
    [data, meta] = await sequelize.query(`UPDATE Ads_create SET status = ${status}, id_ads = ${id_ads} WHERE id_create = ${id}`);
    sucessCode(res, data, "Put thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const createBangQuangCao = async (req, res) => {
  try {
    const { id_ads_location, id_board_type, width, height, quantity, expired_date, photo } = req.body;
    const data = await model.Ads.create({
      id_ads_location: id_ads_location,
      id_board_type: id_board_type,
      width: width,
      height: height,
      quantity: quantity,
      expired_date: expired_date,
      photo: photo
    });
    sucessCode(res, data, "Post thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

// THONGKEBAOCAO
const getAllBaoCaoDDQC = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.id_ads_location, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = R.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office = 1
                                                        UNION
                                                        SELECT R.id_report, R.id_ads_location, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = R.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office = 2
                                                        UNION 
                                                        SELECT R.id_report, R.id_ads_location, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Ads_loc_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = R.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllBaoCaoBQC = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.id_ads, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        LEFT JOIN Ads A ON A.id_ads = R.id_ads
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office = 1
                                                        UNION
                                                        SELECT R.id_report, R.id_ads, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN Ads A ON A.id_ads = R.id_ads
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office = 2
                                                        UNION 
                                                        SELECT R.id_report, R.id_ads, D1.id_district, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Ads_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN Ads A ON A.id_ads = R.id_ads
                                                        LEFT JOIN Ads_location L ON L.id_ads_location = A.id_ads_location
                                                        LEFT JOIN District D1 ON D1.id_district = L.id_district
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getAllBaoCaoDD = async (req, res) => {
  try {
    const [data, metadata] = await sequelize.query(`(SELECT R.id_report, R.address, D1.id_district, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, D.district, NULL AS ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON D.id_district = C.id_district
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office = 1
                                                        UNION
                                                        SELECT R.id_report, R.address, D1.id_district, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, D.district, W.ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON D.id_district = W.id_district
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office = 2
                                                        UNION
                                                        SELECT R.id_report, R.address, D1.id_district, D1.district AS address_district, W1.ward AS address_ward, R.id_report_type, T.report_type, R.report_time, R.status, NULL AS district, NULL AS ward
                                                        FROM Location_report R 
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                        LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                        WHERE office IS NULL)
                                                        ORDER BY id_report`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getBaoCaoBQCById = async (req, res) => {
  try {
    const id = req.params.id;
    const [data, metadata] = await sequelize.query(`SELECT R.id_report, R.id_ads, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, NULL AS ward
                                                        FROM Ads_report R
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboQuan C ON C.email = R.officer
                                                        LEFT JOIN District D ON  D.id_district = C.id_district
                                                        WHERE R.office = 1 AND R.id_report = ${id}
                                                        UNION
                                                        SELECT R.id_report, R.id_ads, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, W.ward
                                                        FROM Ads_report R
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                        LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                        LEFT JOIN District D ON  D.id_district = W.id_district
                                                        WHERE R.office = 2 AND R.id_report = ${id}
                                                        UNION
                                                        SELECT R.id_report, R.id_ads, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, NULL AS district, NULL AS ward
                                                        FROM Ads_report R
                                                        LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                        WHERE R.office IS NULL AND R.id_report = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getBaoCaoDDQCById = async (req, res) => {
  try {
    const id = req.params.id;
    [data, metadata] = await sequelize.query(`SELECT R.id_report, R.id_ads_location, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, NULL AS ward
                                                    FROM Ads_loc_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    LEFT JOIN CanboQuan C ON C.email = R.officer
                                                    LEFT JOIN District D ON  D.id_district = C.id_district
                                                    WHERE R.office = 1 AND R.id_report = ${id}
                                                    UNION
                                                    SELECT R.id_report, R.id_ads_location, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, W.ward
                                                    FROM Ads_loc_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                    LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                    LEFT JOIN District D ON  D.id_district = W.id_district
                                                    WHERE R.office = 2 AND R.id_report = ${id}
                                                    UNION
                                                    SELECT R.id_report, R.id_ads_location, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, NULL AS district, NULL AS ward
                                                    FROM Ads_loc_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    WHERE R.office IS NULL AND R.id_report =  ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
    errorCode(res, "Lỗi BE");
  }
}

const getBaoCaoDDById = async (req, res) => {
  try {
    const id = req.params.id;
    [data, metadata] = await sequelize.query(`SELECT R.id_report, R.address, W1.ward AS address_ward, D1.district AS address_district, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, NULL AS ward
                                                    FROM Location_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    LEFT JOIN CanboQuan C ON C.email = R.officer
                                                    LEFT JOIN District D ON  D.id_district = C.id_district
                                                    LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                    LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                    WHERE R.office = 1 AND R.id_report = ${id}
                                                    UNION
                                                    SELECT R.id_report, R.address, W1.ward AS address_ward, D1.district AS address_district, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, D.district, W.ward
                                                    FROM Location_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    LEFT JOIN CanboPhuong C ON C.email = R.officer
                                                    LEFT JOIN Ward W ON W.id_ward = C.id_ward
                                                    LEFT JOIN District D ON  D.id_district = W.id_district
                                                    LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                    LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                    WHERE R.office = 2 AND R.id_report = ${id}
                                                    UNION
                                                    SELECT R.id_report, R.address, W1.ward AS address_ward, D1.district AS address_district, T.report_type, R.fullname, R.email, R.phone, R.content, R.report_time, R.status, R.resolve, R.photo1, R.photo2, R.officer, R.office, NULL AS district, NULL AS ward
                                                    FROM Location_report R
                                                    LEFT JOIN Report_type T ON T.id_report_type = R.id_report_type
                                                    LEFT JOIN Ward W1 ON W1.id_ward = R.id_ward
                                                    LEFT JOIN District D1 ON D1.id_district = W1.id_district
                                                    WHERE R.office IS NULL AND R.id_report = ${id}`);
    sucessCode(res, data, "Get thành công");
  } catch (err) {
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
  addCanboPhuong,

  getAllDiemDatQuangCao,
  getDiemDatQuangCaoById,
  getAllAdsLocations,
  updateDiemDatQuangCao,
  deleteDiemDatQuangCao,

  getAllBangQuangCao,
  getBangQuangCaoById,
  updateBangQuangCao,
  deleteBangQuangCao,

  getAllYeuCauChinhSuaDDQC,
  getYeuCauChinhSuaDDQCById,
  getAllYeuCauChinhSuaBQC,
  getYeuCauChinhSuaBQCById,

  updateYeuCauChinhSuaDDQC,
  updateYeuCauChinhSuaBQC,

  getAllYeuCauCapPhep,
  getYeuCauCapPhepById,
  updateYeuCauCapPhep,
  createBangQuangCao,

  getAllBaoCaoDDQC,
  getAllBaoCaoBQC,
  getAllBaoCaoDD,

  getBaoCaoBQCById,
  getBaoCaoDDQCById,
  getBaoCaoDDById,
};