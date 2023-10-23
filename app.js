const express = require('express');
const app = express();
const portNguoiDan = 8081; 
const portCanBo = 8080;

const sequelize = require('./models/index');
const config = require('./config/index');
const path = require('path');
app.use(express.json());
// app.use('/public', express.static('public'));

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

// Thiết lập EJS làm view engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

const appNguoiDan = express();
appNguoiDan.listen(portNguoiDan, () => {
  console.log(`Phân hệ người dân đang chạy trên cổng ${portNguoiDan}`);
});

const appCanBo = express();
appCanBo.listen(portCanBo, () => {
  console.log(`Phân hệ cán bộ đang chạy trên cổng ${portCanBo}`);
});

// Sử dụng rootRoute cho cả hai ứng dụng
const rootRoute = require('./routes');
appNguoiDan.use('/api', rootRoute);
appCanBo.use('/api', rootRoute);

appCanBo.set('view engine', 'ejs');
appCanBo.set('views', path.join(__dirname, 'views'));
appCanBo.use('/public', express.static('public'));

appCanBo.get('/', function(req, res) {
  res.render('CanBo/login');
});
