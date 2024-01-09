const express = require('express');
const app = express();
const port = 8080;
const request = require('request');
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

const cors = require('cors');
app.use(cors());

// const db = require('./models/index');
// const config = require('./config/index');

// db.sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to the database successfully');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

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

// SO
app.get('/quanlichung', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data

  res.render('CanBo/So/quanlichung', {...content});
});

app.get('/quanliquan', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/quanliquan', {...content});
});

app.get('/quanliphuong', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/quanliphuong', {...content});
});

app.get('/quanlicanbo', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/quanlicanbo', {...content});
});

app.get('/quanlicanbo/chinhsuacbquan', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chinhsuaCBQuan', { email: req.query.email, ...content });
});

app.get('/quanlicanbo/themcbquan', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/themCBQuan', {...content});
});

app.get('/quanlicanbo/chinhsuacbphuong', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chinhsuaCBPhuong', { email: req.query.email, ...content });
});

app.get('/quanlicanbo/themcbphuong', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/themCBPhuong', {...content});
});

app.get('/diemdatquangcao', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/diemdatquangcao', {...content});
});

app.get('/diemdatquangcao/chinhsua', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chinhsuaDDQC', { id: req.query.id, ...content });
});

app.get('/diemdatquangcao/them', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/themDDQC', {...content});
});

app.get('/bangquangcao', verifyToken, function(req, res) {  
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/bangquangcao', {...content});
});

app.get('/bangquangcao/chinhsua', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chinhsuaBQC', { id: req.query.id, ...content });
});

app.get('/bangquangcao/them', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/themBQC', {...content});
});

app.get('/yeucauchinhsua', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/yeucauchinhsua', {...content});
});

app.get('/yeucauchinhsua/ddqc', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chitietDDQC', { id: req.query.id, ...content });
});

app.get('/yeucauchinhsua/bqc', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chitietBQC', { id: req.query.id, ...content });
});  

app.get('/yeucaucapphep', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/yeucaucapphep', {...content});
});

app.get('/yeucaucapphep/chitiet', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/chitietYCCP', { id: req.query.id, ...content });
});

app.get('/thongkebaocao', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/thongkebaocao', {...content});
});

app.get('/thongkebaocao/bqc', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/baocaoBQC', { id: req.query.id, ...content });
});

app.get('/thongkebaocao/ddqc', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/baocaoDDQC', { id: req.query.id, ...content });
});

app.get('/thongkebaocao/dd', verifyToken, function(req, res) {
  const token = req.cookies?.token;
  const content = decodeToken(token).data
  res.render('CanBo/So/baocaoDD', { id: req.query.id, ...content });
});
