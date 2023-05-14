import express from "express";
import db from '../models/index';
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import nguoidatveService from "../services/nguoidatveService"
import tripCRUD from "../services/tripCRUD"
import searchtripService from "../services/searchtripService"
const ejs = require('ejs');
const path = require('path');

let homepage =(req,res)=>{
    let idlogin = null
    return res.render("HomePage/ejs/main.ejs",{idlogin:idlogin})
}

let dangKy = (req, res) => {
    return res.render("dangky.ejs")
}
let dangNhap = (req, res) => {

    return res.render("dangnhap.ejs", { er: null })

}
let loginn = async (req, res) => {
    
    let SDT_password = req.body;
    console.log(SDT_password)
    let result  = await dangNhapDangKyService.checkdangnhap(SDT_password)
    console.log(result)
    if(result.message=="Bạn đã đăng nhập thành công")
    {
        let idlogin  = result.data.id;
        
        return res.render("HomePage/ejs/main.ejs",{idlogin:idlogin})
    }
    else
    {
        res.render("dangnhap.ejs", {er :result.message})
    }

}
let completeRegister = async (req, res) => {
    let message = await dangNhapDangKyService.createNewUser(req.body); // req.body la data nguoi nhap
    console.log(message);
    return res.send("Chúc mừng bạn đã đăng kí thành công!")
}
let insertUser = async (req, res) => {
    let data = await dangNhapDangKyService.dataUser();
    return res.render('dataUser.ejs', { user: data })
}

let thaydoithongtin = async (req, res) => {
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    return res.render("editUser.ejs", { user: data })
}
let capnhatthongtin = async (req, res) => {
    let user = req.body;
    console.log(user);
    let message = dangNhapDangKyService.updateUser(user);
    return res.send("Cập nhật thông tin thành công")
}
let xemtruocuser = async (req, res) => {
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    console.log(data)
    // let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.render('xoaUser.ejs', { user: data })
}
let xoaiduser = async (req, res) => {
    let userid = req.body;
    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    // let data = await dangNhapDangKyService.dataUser();
    return res.send("Xoa thông tin thành công ")
    // return res.render('dataUser.ejs',{user:data})
}
let thongtincanhan = async(req,res)=>{
    let userid = req.body.userID
    console.log("user ID" + req.body.userID)
    let data = await dangNhapDangKyService.infomationUser(userid);
    console.log(data)
    return res.render("thongtincanhan.ejs",{user:data})
}
let dangxuat = (req,res)=>{
    
}
/*------------------TRIP---------------*/

let formCreateTrip = (req, res) => {
    return res.render("nhapTrip.ejs")
}

let doneCreateTrip = async (req, res) => {
    let message = await tripCRUD.createNewTrip(req.body)
    return res.send("Tạo thành công!")
}

let xemTrip = async (req, res) => {
    let data = await tripCRUD.getAllDataTrip()
    return res.render('dataTrip.ejs', {
        trip: data //trip <-- data
    })
}

let getEditTripById = async (req, res) => {

    let tripId = req.query.id
    console.log(tripId)
    if (tripId) {
        let tripData = await tripCRUD.getTripInforById(tripId)
        return res.render('editTrip.ejs', {
            trip: tripData
        })
    }
    else return res.send('Trip not found!')
}

let editTripsById = async (req, res) => {
    let tripId = req.query.id
    if (tripId) {
        let data = await tripCRUD.getTripById(tripId);
        return res.render("editTrip.ejs", { trip: data })
    }
    else return res.send('Trip not found!')
}

let updateTrips = async (req, res) => {
    let trip = req.body;
    let allTrips = await tripCRUD.updateTrip(trip);
    return res.render('dataTrip.ejs', {
        trip: allTrips
    })
}

let deleteTrip = async (req, res) => {
    console.log(req.query.id)
    let trip = req.query.id
    if (trip) {
        await tripCRUD.deteleTripById(trip)
        return res.send('Xóa chuyến thành công!')
    }
    else {
        return res.send("Chuyến không tìm thây!")
    }
}

/* --------------BOOKING ----------*/
let dataBooker = (req, res) => {
    return res.render("databooker.ejs")
}
let completeDatabooker = async (req, res) => {
    let message = await nguoidatveService.createNewBooker(req.body);
    console.log(message)
    return res.send('post crud from sever');
}

let displaybooker = async (req, res) => {
    let data = await nguoidatveService.getAllBooker();
    console.log('------------------------')
    console.log(data)
    console.log('------------------------')
    return res.render('displaybooker.ejs', {
        dataTable: data
    });
}
/*nút sửa người đặt vé*/
let editbooker = async (req, res) => {
    let bookerId = req.query.id;
    if (bookerId) {
        let bookerData = await nguoidatveService.getBookerInforById(bookerId);
        console.log('-----------------------')
        console.log(bookerData)
        console.log('-----------------------')
        //let bookerData
        return res.render('editbooker.ejs', {
            booker: bookerData
        });
    } else {
        return res.send('Booker not found!');
    }
}
/*Sau khi sửa xong chuyển đến trang displaybooker2.ejs để xác nhận sửa thành công*/
let putbooker = async (req, res) => {
    let data = req.body;
    let allBookers = await nguoidatveService.updateBookerData(data);
    return res.render('displaybooker2.ejs', {
        dataTable: allBookers
    });
}
/**/

/*nút xoá người đặt vé*/ 
let deletebooker = async (req, res) => {
    let bookerId = req.query.id;
    if (bookerId) {
        let bookerData = await nguoidatveService.getBookerInforById(bookerId);
        console.log('-----------------------')
        console.log(bookerData)
        console.log('-----------------------')
        //let bookerData
        return res.render('deletebooker.ejs', {
            booker: bookerData
        });
    } else {
        return res.send('Booker not found!');
    }
}
/*Sau khi xoá xong chuyển đến trang displaybooker.ejs để xác nhận xoá thành công*/
let deletebooker1 = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await nguoidatveService.deleteBookerById(id);
        //return res.send('Xoá người đặt vé thành công!')
        return res.render('displaybooker.ejs');
    } else {
        return res.send('Người đặt vé không tồn tại!')
    }
}
/**/

/**********************************************************************
let putbooker = async (req, res) => {
    let data = req.body;
    let allBookers = await nguoidatveService.updateBookerData(data);
    return res.render('displaybooker.ejs', {
        dataTable: allBookers
    });
}*/ 

/*
let deletebooker = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await nguoidatveService.deleteBookerById(id);
        return res.send('Xoá người đặt vé thành công!')
    } else {
        return res.send('Người đặt vé không tồn tại!')
    }
}*/

/* --------------TRANG ADMIN ----------*/
let insertUser1 = async(req, res)=>{
    let data = await dangNhapDangKyService.dataAdmin();
    /*return res.render('admin.ejs',{user:data})*/
    return res.render('../views/AdminPage/ejs/admin.ejs',{user:data})
}
let insertUser2 = async(req, res)=>{
    let data = await dangNhapDangKyService.dataAdmin();
    return res.render('../views/AdminPage/ejs/danhsachve.ejs',{user:data})
}
let insertUser3 = async(req, res)=>{
    let data = await nguoidatveService.getAllBooker();
    return res.render('../views/AdminPage/ejs/thongtindat.ejs',{dataTable:data})
}
let insertUser4 = async(req, res)=>{
    let data = await tripCRUD.getAllDataTrip();
    return res.render('../views/AdminPage/ejs/quanlilichtrinh.ejs',{trip:data})
}
/*----------------------------------------------------------------------------------------*/

/* -------------Trang booking----------*/
let insertUser5 = async(req, res)=>{
    let data = await dangNhapDangKyService.dataAdmin();
    /*return res.render('admin.ejs',{user:data})*/
    return res.render('../views/HomePage/ejs/booking.ejs',{user:data})
}
/*----------------------------------------------------------------------------------------*/

/* -------------Trang chủ----------*/
let insertUser6 = async(req, res)=>{
    let idlogin = null
    return res.render("HomePage/ejs/main.ejs",{idlogin:idlogin})
}
/*----------------------------------------------------------------------------------------*/

let timkiemtau = async(req,res)=>{
    let infotau = req.body
    console.log(infotau)
    console.log("infotau.from",infotau.from)
    let data = await searchtripService.handleSearchTripTrue(infotau.from, infotau.to,infotau.daygo)
    return res.render('dataTrip.ejs', {
        trip: data //trip <-- data
    })
}
let hienthivetau =async(req,res)=>{
    let  tauid = req.query.id
    console.log(tauid)
    let data = await tripCRUD.hienthive(tauid)
    console.log(data.length)
    res.render("ticketUser.ejs",{tickets:data})
}


module.exports = {
    //USER
    homepage :homepage,
    dangKy :dangKy,
    dangNhap :dangNhap,
    completeRegister :completeRegister,
    insertUser :insertUser,
    thaydoithongtin :thaydoithongtin,
    capnhatthongtin: capnhatthongtin,

    xoaiduser :xoaiduser,
    loginn :loginn,
    xemtruocuser :xemtruocuser ,
    thongtincanhan :thongtincanhan,
    hienthivetau:hienthivetau,


    //BOOKING
    dataBooker: dataBooker,
    completeDatabooker: completeDatabooker,
    displaybooker: displaybooker,
    editbooker: editbooker,
    putbooker: putbooker,
    deletebooker: deletebooker,
    //Trip
    formCreateTrip: formCreateTrip,
    doneCreateTrip: doneCreateTrip,
    xemTrip: xemTrip,
    getEditTripById: getEditTripById,
    editTripsById: editTripsById,
    updateTrips: updateTrips,
    deleteTrip: deleteTrip,
    //Lấy dữ liệu tài khoản người dùng
    insertUser1:insertUser1,
    insertUser2: insertUser2,
    insertUser3: insertUser3,
    insertUser4: insertUser4,
    //Trang booking
    insertUser5: insertUser5,
    //Trang chủ
    insertUser6: insertUser6,


    timkiemtau:timkiemtau,

//nút xoá người đặt vé
    deletebooker1: deletebooker1,
//


}

