import express from "express";
import homeControllers from "../controllers/homeControllers";
/*const nguoidatveService = require('../services/nguoidatveService');*/
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
    router.get('/dangxuat',homeControllers.dangxuat)

    router.get('/tonghopthongtin',homeControllers.tonghopthongtin)
    router.post('/tongsotauve',homeControllers.tonghoptauve)
    //TRIP
    router.get('/nhapTrip', homeControllers.formCreateTrip)
    router.post('/done-nhapTrip', homeControllers.doneCreateTrip);
    router.get('/display-trips', homeControllers.xemTrip)
    router.get('/edit-trip', homeControllers.getEditTripById)
    router.post('/update-trip', homeControllers.updateTrips)
    router.get('/delete-trip', homeControllers.deleteTrip)
    router.get('/vetau',homeControllers.hienthivetau)
    //BOOK
    router.get('/databooker', homeControllers.dataBooker);
    router.post('/complete-databooker', homeControllers.completeDatabooker);
    router.get('/get-databooker', homeControllers.displaybooker);
    router.get('/edit-databooker', homeControllers.editbooker);

    //xoá người đặt vé
    router.get('/delete-databooker', homeControllers.deletebooker)
    //
    //sau khi xoá người đặt vé sẽ chạy tới cái này để thông báo ra người dùng
    router.get('/displaybooker', homeControllers.deletebooker1)
    //

    //sua
    //router.post('/capnhat-databooker', homeControllers.putbooker)
    router.post('/AdminPage/ejs/thongtindat', homeControllers.putbooker)
    //xoa
    //router.get('/delete-databooker', homeControllers.deletebooker)

    //LẤY DỮ LIỆU NGƯỜI DÙNG RA TRANG ADMIN
    router.get('/AdminPage/ejs/admin', homeControllers.insertUser1);
    router.get('/AdminPage/ejs/danhsachve', homeControllers.insertUser2);
    router.get('/AdminPage/ejs/thongtindat', homeControllers.insertUser3);
    router.get('/AdminPage/ejs/quanlilichtrinh', homeControllers.insertUser4);

    //Trang chủ
    router.get('/HomePage/ejs/main', homeControllers.insertUser6);

    //Trang booking (Tìm kiếm)
    router.post('/HomePage/ejs/booking',homeControllers.timkiemtau)

    //Trang điền thông tin người đặt vé
    //router.get('/HomePage/ejs/dataCustomer', homeControllers.dataBooker);



    /*router.get('/admin', (req, res) => {
        connection.query('SELECT * FROM users', (error, results, fields) => {
          if (error) throw error;
          res.render('admin', {data: users});
        });
      });*/
    return app.use("/", router);

}

module.exports = initWebRouters;