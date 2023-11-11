const express = require('express');
const app = express();
const portNguoiDan = 8081; 
const portCanBo = 8080;

const sequelize = require('./models/index');
const config = require('./config/index');
const path = require('path');
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Kết nối tới cơ sở dữ liệu MySQL bằng Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const appNguoiDan = express();
appNguoiDan.listen(portNguoiDan, () => {
  console.log(`Phân hệ người dân đang chạy trên cổng ${portNguoiDan}`);
});

const appCanBo = express();
appCanBo.listen(portCanBo, () => {
  console.log(`Phân hệ cán bộ đang chạy trên cổng ${portCanBo}`);
});

// Thiết lập EJS cho appNguoiDan
appNguoiDan.set('view engine', 'ejs');
appNguoiDan.set('views', path.join(__dirname, 'views'));
appNguoiDan.use('/public', express.static('public'));

// Thiết lập EJS cho appCanBo
appCanBo.set('view engine', 'ejs');
appCanBo.set('views', path.join(__dirname, 'views'));
appCanBo.use('/public', express.static('public'));

// Sử dụng rootRoute cho cả hai ứng dụng
const rootRoute = require('./routes');
appNguoiDan.use('/api', rootRoute);
appCanBo.use('/api', rootRoute);

appNguoiDan.get('/', function(req, res) {
  res.render('NguoiDan/homepageNguoiDan');
});

appCanBo.get('/login', function(req, res) {
  res.render('CanBo/login');
});

appCanBo.get('/', function(req, res) {
  res.render('CanBo/homepageCanbo');
});

appCanBo.get('/quanlichung', function(req, res) {
  res.render('CanBo/So/quanlichung');
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




