import express from "express";
import homeControllers from "../controllers/homeControllers";
const nguoidatveService = require('../services/nguoidatveService');
let router = express.Router();

//const express = require('express');
//const router = express.Router();


/*
const app = express();
const ejs = require('ejs');
// Rest of your code goes here
app.set('view engine', 'ejs');
//////lấy dữ liệu người dùng ra admin
// Khai báo thư viện body-parser
*/



///////////////////
let initWebRouters = (app) => {
    //USER
    router.get('/', homeControllers.homepage);
    router.get('/dangky', homeControllers.dangKy);
    router.post('/complete-register', homeControllers.completeRegister);   
    router.get('/dangnhap', homeControllers.dangNhap);
    router.post('/login',homeControllers.loginn)
    router.get('/dataUser', homeControllers.insertUser);
    router.get('/editUser',homeControllers.thaydoithongtin);
    router.post('/updatethongtinUser',homeControllers.capnhatthongtin);
    router.get('/xemtruockhixoa',homeControllers.xemtruocuser);
    router.post('/xoa-user',homeControllers.xoaiduser);
    router.post('/post-thongtincanhan', homeControllers.thongtincanhan)

    //TRIP
    router.get('/nhapTrip', homeControllers.formCreateTrip)
    router.post('/done-nhapTrip', homeControllers.doneCreateTrip);
    router.get('/display-trips', homeControllers.xemTrip)
    router.get('/edit-trip', homeControllers.getEditTripById)
    router.post('/update-trip', homeControllers.updateTrips)
    router.get('/delete-trip', homeControllers.deleteTrip)
    
    //BOOK
    router.get('/databooker', homeControllers.dataBooker);
    router.post('/complete-databooker', homeControllers.completeDatabooker);
    router.get('/get-databooker', homeControllers.displaybooker);
    router.get('/edit-databooker', homeControllers.editbooker);
    //sua
    router.post('/capnhat-databooker', homeControllers.putbooker)
    //xoa
    router.get('/delete-databooker', homeControllers.deletebooker)

    //LẤY DỮ LIỆU NGƯỜI DÙNG RA TRANG ADMIN
    router.get('/AdminPage/ejs/admin', homeControllers.insertUser1);
    router.get('/AdminPage/ejs/danhsachve', homeControllers.insertUser2);
    //router.get('/AdminPage/ejs/thongtindat', homeControllers.insertUser3);
    router.get('/AdminPage/ejs/quanlilichtrinh', homeControllers.insertUser4);

    //Trang booking
    router.get('/HomePage/ejs/booking', homeControllers.insertUser5);
    //Trang chủ
    router.get('/HomePage/ejs/main', homeControllers.insertUser6);
    //Modal sửa thông tin người đặt
    //router.get('/AdminPage/ejs/thongtindat', homeControllers.getEditbooker);



    router.get('/AdminPage/ejs/thongtindat', async (req, res) => {
      let bookerId = req.query.id;
      if (bookerId) {
          let bookerData = await nguoidatveService.getBookerInforById(bookerId);
          return res.render('AdminPage/ejs/thongtindat', {
              booker: bookerData
          });
      } else {
          let data = await nguoidatveService.getAllBooker();
          return res.render('../views/AdminPage/ejs/thongtindat.ejs', {
              dataTable: data,
              booker: {} // or null, or any other default value you prefer
          });
      }
  });
  

    

    /*router.get('/admin', (req, res) => {
        connection.query('SELECT * FROM users', (error, results, fields) => {
          if (error) throw error;
          res.render('admin', {data: users});
        });
      });*/
    return app.use("/", router);

}

module.exports = initWebRouters;