const express = require('express');
const app = express();
const port = 8080;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

const cors = require('cors');
app.use(cors());

const sequelize = require('./models/index');
const config = require('./config/index');

// Kết nối tới cơ sở dữ liệu MySQL bằng Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// const authRouter = require('./routes/authRoute')
require('./passport') 

app.listen(port, () => {
  console.log(`Phân hệ cán bộ đang chạy trên cổng ${port}`);
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
// Thiết lập EJS cho app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));

// Sử dụng rootRoute cho cả hai ứng dụng
const rootRoute = require('./routes');
app.use('/api', rootRoute);

app.get('/login', function(req, res) {
  res.render('CanBo/login');
});

app.get('/forget-pass', function(req, res) {
  const email = req.query.email;

  res.render('CanBo/forget-pass', { email: email});
});

app.get('/', function(req, res) {
  res.render('CanBo/homepageCanBo');
});

app.get('/adsLocation', function(req, res) {
  res.render('CanBo/PhuongQuan/adsLocation');
});

app.get('/ads', function(req, res) {
  res.render('CanBo/PhuongQuan/ads');
});

app.get('/report', function(req, res) {
  res.render('CanBo/PhuongQuan/report');
});

app.get('/detailReport', function(req, res) {
  const id_report = req.query.id_report;
  const table = req.query.table;

  res.render('CanBo/PhuongQuan/detailReport', { id_report: id_report, table: table });
});

app.get('/createAds', function(req, res) {
  res.render('CanBo/PhuongQuan/adsCreate');
});

app.get('/detailAdsCreate', function(req, res) {
  const id_create = req.query.id_create;

  res.render('CanBo/PhuongQuan/detailAdsCreate', { id_create: id_create});
});

app.get('/account', function(req, res) {
  res.render('CanBo/account');
});

// PHUONG
app.get('/adsLocationPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsLocationPhuong');
});

app.get('/adsPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsPhuong');
});

app.get('/reportPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/reportPhuong');
});

app.get('/createAdsPhuong', function(req, res) {
  res.render('CanBo/PhuongQuan/adsCreatePhuong');
});

// SO
app.get('/quanlichung', function(req, res) {
  res.render('CanBo/So/quanlichung');
});

app.get('/quanliquan', function(req, res) {
  res.render('CanBo/So/quanliquan');
});

app.get('/quanliphuong', function(req, res) {
  res.render('CanBo/So/quanliphuong');
});

app.get('/quanlicanbo', function(req, res) {
  res.render('CanBo/So/quanlicanbo');
});

app.get('/quanlicanbo/chinhsuacbquan', function(req, res) {
  res.render('CanBo/So/chinhsuaCBQuan', { id: req.query.id });
});

app.get('/quanlicanbo/themcbquan', function(req, res) {
  res.render('CanBo/So/themCBQuan');
});

app.get('/quanlicanbo/chinhsuacbphuong', function(req, res) {
  res.render('CanBo/So/chinhsuaCBPhuong', { id: req.query.id });
});

app.get('/quanlicanbo/themcbphuong', function(req, res) {
  res.render('CanBo/So/themCBPhuong');
});

app.get('/diemdatquangcao', function(req, res) {
  res.render('CanBo/So/diemdatquangcao');
});

app.get('/diemdatquangcao/chinhsua', function(req, res) {
  res.render('CanBo/So/chinhsuaDDQC', { id: req.query.id });
});

app.get('/diemdatquangcao/them', function(req, res) {
  res.render('CanBo/So/themDDQC');
});

app.get('/bangquangcao', function(req, res) {  
  res.render('CanBo/So/bangquangcao');
});

app.get('/bangquangcao/chinhsua', function(req, res) {
  res.render('CanBo/So/chinhsuaBQC', { id: req.query.id });
});

app.get('/bangquangcao/them', function(req, res) {
  res.render('CanBo/So/themBQC');
});

app.get('/yeucauchinhsua', function(req, res) {
  res.render('CanBo/So/yeucauchinhsua');
});

app.get('/yeucauchinhsua/ddqc', function(req, res) {
  res.render('CanBo/So/chitietDDQC', { id: req.query.id });
});

app.get('/yeucauchinhsua/bqc', function(req, res) {
  res.render('CanBo/So/chitietBQC', { id: req.query.id });
});  

app.get('/yeucaucapphep', function(req, res) {
  res.render('CanBo/So/yeucaucapphep');
});

app.get('/yeucaucapphep/chitiet', function(req, res) {
  res.render('CanBo/So/chitietYCCP', { id: req.query.id });
});

app.get('/thongkebaocao', function(req, res) {
  res.render('CanBo/So/thongkebaocao');
});

app.get('/thongkebaocao/bqc', function(req, res) {
  res.render('CanBo/So/baocaoBQC', { id: req.query.id });
});

app.get('/thongkebaocao/ddqc', function(req, res) {
  res.render('CanBo/So/baocaoDDQC', { id: req.query.id });
});

app.get('/thongkebaocao/dd', function(req, res) {
  res.render('CanBo/So/baocaoDD', { id: req.query.id });
});
