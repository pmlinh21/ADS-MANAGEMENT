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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rootRoute = require('./routes');
app.use('/api', rootRoute);

require('./passport') 

const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.use(session({
  secret: process.env.JWT_SECRET_KEY, // Replace with your secret key
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: true,
    maxAge: 20 * 60 * 1000
  }
}));

app.listen(port, () => {
  console.log(`Phân hệ cán bộ đang chạy trên cổng ${port}`);
});

const path = require('path');
// Thiết lập EJS cho app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));

const { decodeToken, verifyToken } = require('./middlewares/baseToken');

app.get('/login', function(req, res) {
  if (req.cookies.token)
    res.redirect("/")

  const status = req.query.status;

  res.render('CanBo/login',{status: status});
});

app.get('/logout', function(req, res) {
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/forget-pass', function(req, res) {
  const email = req.query.email;

  res.render('CanBo/forget-pass', { email: email});
});

app.get('/', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/homepageCanBo', {id_ward: 0, id_district: 0, ...content})

});

app.get('/adsLocation', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/PhuongQuan/adsLocation', {id_ward: 0, id_district: 0, ...content});
});

app.get('/ads', verifyToken,function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/PhuongQuan/ads', {id_ward: 0, id_district: 0, ...content});
});

app.get('/report', verifyToken,function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/PhuongQuan/report', {id_ward: 0, id_district: 0, ...content});
});

app.get('/detailReport', verifyToken, function(req, res) {
  const id_report = req.query.id_report;
  const table = req.query.table;

  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/PhuongQuan/detailReport', { id_report: id_report, table: table, id_ward: 0, id_district: 0, ...content });
});

app.get('/createAds', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  
  res.render('CanBo/PhuongQuan/adsCreate', {id_ward: 0, id_district: 0, ...content});
});

app.get('/detailAdsCreate', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  const id_create = req.query.id_create;

  res.render('CanBo/PhuongQuan/detailAdsCreate', { id_create: id_create, id_ward: 0, id_district: 0, ...content});
});

app.get('/account', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/account', {id_ward: 0, id_district: 0, ...content});
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
