const express = require('express');
const app = express();
const port = 8080;

const sequelize = require('./models/index');
const config = require('./config/index');
const path = require('path');
app.use(express.json());
app.use(express.static("public")); // Đảm bảo thư mục public chứa các tài nguyên tĩnh như CSS, JavaScript, hình ảnh, ...

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const rootRoute = require('./routes');
app.use("/api", rootRoute);

// Thiết lập EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));