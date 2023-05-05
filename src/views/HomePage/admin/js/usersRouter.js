// usersRouter.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const ejs = require('ejs');

// Khai báo kết nối tới cơ sở dữ liệu
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'webproject'
});

// Kết nối tới cơ sở dữ liệu
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

router.get('/admin', (req, res) => {
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    console.log(results); // in ra dữ liệu lấy từ cơ sở dữ liệu
    res.render('admin', { data: results });
  });
});


module.exports = router;
