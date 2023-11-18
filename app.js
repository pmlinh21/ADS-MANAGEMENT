const express = require('express');
const app = express();
// const portNguoiDan = 8081; 
const portCanBo = 8080;

const sequelize = require('./models/index');
const config = require('./config/index');
const path = require('path');
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Kết nối tới cơ sở dữ liệu MySQL bằng Sequelize
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to the database successfully');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// const appNguoiDan = express();
// appNguoiDan.listen(portNguoiDan, () => {
//   console.log(`Phân hệ người dân đang chạy trên cổng ${portNguoiDan}`);
// });

const appCanBo = express();
appCanBo.listen(portCanBo, () => {
  console.log(`Phân hệ cán bộ đang chạy trên cổng ${portCanBo}`);
});

// Thiết lập EJS cho appNguoiDan
// appNguoiDan.set('view engine', 'ejs');
// appNguoiDan.set('views', path.join(__dirname, 'views'));
// appNguoiDan.use('/public', express.static('public'));

// Thiết lập EJS cho appCanBo
appCanBo.set('view engine', 'ejs');
appCanBo.set('views', path.join(__dirname, 'views'));
appCanBo.use('/public', express.static('public'));

// Sử dụng rootRoute cho cả hai ứng dụng
// const rootRoute = require('./routes');
// appNguoiDan.use('/api', rootRoute);
// appCanBo.use('/api', rootRoute);

// appNguoiDan.get('/', function(req, res) {
//   res.render('NguoiDan/homepageNguoiDan');
// });

appCanBo.get('/login', function(req, res) {
  res.render('CanBo/login');
});

appCanBo.get('/forget-pass', function(req, res) {
  const email = req.query.email;

  res.render('CanBo/forget-pass', { email: email});
});

appCanBo.get('/', function(req, res) {
  res.render('CanBo/homepageCanBo');
});

appCanBo.get('/adsLocation', function(req, res) {
  res.render('CanBo/PhuongQuan/adsLocation');
});

appCanBo.get('/ads', function(req, res) {
  res.render('CanBo/PhuongQuan/ads');
});

appCanBo.get('/report', function(req, res) {
  res.render('CanBo/PhuongQuan/report');
});

appCanBo.get('/detailReport', function(req, res) {
  const id_report = req.query.id_report;
  const table = req.query.table;

  res.render('CanBo/PhuongQuan/detailReport', { id_report: id_report, table: table });
});

appCanBo.get('/createAds', function(req, res) {
  res.render('CanBo/PhuongQuan/adsCreate');
});

appCanBo.get('/detailAdsCreate', function(req, res) {
  const id_create = req.query.id_create;

  res.render('CanBo/PhuongQuan/detailAdsCreate', { id_create: id_create});
});

appCanBo.get('/account', function(req, res) {
  res.render('CanBo/account');
});

// PHUONG
appCanBo.get('/adsLocationPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsLocationPhuong');
});

appCanBo.get('/adsPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsPhuong');
});

appCanBo.get('/reportPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/reportPhuong');
});

appCanBo.get('/createAdsPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsCreatePhuong');
});

// SO
appCanBo.get('/quanlichung', function(req, res) {
  res.render('CanBo/So/quanlichung');
});

appCanBo.get('/quanliquan', function(req, res) {
  res.render('CanBo/So/quanliquan');
});

appCanBo.get('/quanliphuong', function(req, res) {
  res.render('CanBo/So/quanliphuong');
});

appCanBo.get('/quanlicanbo', function(req, res) {
  res.render('CanBo/So/quanlicanbo');
});

appCanBo.get('/quanlicanbo/chinhsuacbquan', function(req, res) {
  res.render('CanBo/So/chinhsuaCBQuan', { id: req.query.id });
});

appCanBo.get('/quanlicanbo/themcbquan', function(req, res) {
  res.render('CanBo/So/themCBQuan');
});

appCanBo.get('/quanlicanbo/chinhsuacbphuong', function(req, res) {
  res.render('CanBo/So/chinhsuaCBPhuong', { id: req.query.id });
});

appCanBo.get('/quanlicanbo/themcbphuong', function(req, res) {
  res.render('CanBo/So/themCBPhuong');
});

appCanBo.get('/diemdatquangcao', function(req, res) {
  res.render('CanBo/So/diemdatquangcao');
});

appCanBo.get('/diemdatquangcao/chinhsua', function(req, res) {
  res.render('CanBo/So/chinhsuaDDQC', { id: req.query.id });
});

appCanBo.get('/diemdatquangcao/them', function(req, res) {
  res.render('CanBo/So/themDDQC');
});

appCanBo.get('/bangquangcao', function(req, res) {  
  res.render('CanBo/So/bangquangcao');
});

appCanBo.get('/bangquangcao/chinhsua', function(req, res) {
  res.render('CanBo/So/chinhsuaBQC', { id: req.query.id });
});

appCanBo.get('/bangquangcao/them', function(req, res) {
  res.render('CanBo/So/themBQC');
});

appCanBo.get('/yeucauchinhsua', function(req, res) {
  res.render('CanBo/So/yeucauchinhsua');
});

appCanBo.get('/yeucauchinhsua/ddqc', function(req, res) {
  res.render('CanBo/So/chinhsuaDDQC', { id: req.query.id });
});

appCanBo.get('/yeucauchinhsua/bqc', function(req, res) {
  res.render('CanBo/So/chinhsuaBQC', { id: req.query.id });
});  

appCanBo.get('/yeucaucapphep', function(req, res) {
  res.render('CanBo/So/yeucaucapphep');
});

appCanBo.get('/yeucaucapphep/chitiet', function(req, res) {
  res.render('CanBo/So/chitietYCCP', { id: req.query.id });
});

appCanBo.get('/thongkebaocao', function(req, res) {
  res.render('CanBo/So/thongkebaocao');
});

appCanBo.get('/thongkebaocao/bqc', function(req, res) {
  res.render('CanBo/So/baocaoBQC', { id: req.query.id });
});

appCanBo.get('/thongkebaocao/ddqc', function(req, res) {
  res.render('CanBo/So/baocaoDDQC', { id: req.query.id });
});

appCanBo.get('/thongkebaocao/dd', function(req, res) {
  res.render('CanBo/So/baocaoDD', { id: req.query.id });
});
