const express = require('express');
const app = express();
const mysql = require('mysql');
const webRouter = require('./routes/web');

// Khai báo kết nối tới cơ sở dữ liệu
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'webproject'
});

// Cấu hình đường dẫn tới thư mục chứa các file tĩnh
app.use(express.static(__dirname + '/public'));

// Cấu hình EJS làm view engine
app.set('view engine', 'ejs');

// Sử dụng route /users để truy cập vào file usersRouter.js
app.use('/', webRouter);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
