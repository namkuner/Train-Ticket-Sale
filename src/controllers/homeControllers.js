import express from "express";
import db from '../models/index';
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import nguoidatveService from "../services/nguoidatveService"
/*const express = require("express");
const db = require('../models/index');
const dangNhapDangKyService = require("../services/dangNhapDangKyService");
const nguoidatveService = require("../services/nguoidatveService");*/

let dangKy = (req,res)=>{
    return res.render("dangky.ejs")
}
let dangNhap = (req, res)=>{
    return res.render("dangnhap.ejs")
    
}
let completeRegister =async(req, res)=>{
    let message = await dangNhapDangKyService.createNewUser(req.body); // req.body la data nguoi nhap
    console.log(message);
    return res.send("Chúc mừng bạn đã đăng kí thành công!");
}
let insertUser = async(req, res)=>{
    let data = await dangNhapDangKyService.dataUser();
    return res.render('dataUser.ejs',{user:data});
}

let thaydoithongtin = async(req,res)=>{
    console.log(req.query.id);
    let userid = req.query.id;
    let data = await dangNhapDangKyService.infomationUser(userid);
    return res.render("editUser.ejs",{user:data});
}
let capnhatthongtin = async(req,res)=>{
    let user = req.body;
    console.log(user);
    let message = await dangNhapDangKyService.updateUser(user);
    return res.send("Cập nhật thông tin thành công");
}
let chuanbixoa = async(req,res)=>{
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    // let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.render("xoaUser.ejs",{user:data})
}
let xoaUser = async(req,res)=>{
    let userid =req.body.userid;
    
    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    // let data = await dangNhapDangKyService.dataUser();
    return res.send("xóa thông tin thành công")
    // return res.render('dataUser.ejs',{user:data})
}
//////
let dataBooker = (req,res)=>{
    return res.render("databooker.ejs")
}
let completeDatabooker = async(req, res)=>{
    let message = await nguoidatveService.createNewBooker(req.body);
    console.log(message)
    return res.send('post crud from sever');
}

let displaybooker = async (req, res)=>{
    let data = await nguoidatveService.getAllBooker();
    console.log('------------------------')
    console.log(data)
    console.log('------------------------')
    return res.render('displaybooker.ejs', {
        dataTable: data
    });
}

let editbooker = async(req, res) => {
    let bookerId = req.query.id;
    if(bookerId){
        let bookerData = await nguoidatveService.getBookerInforById(bookerId);
        console.log('-----------------------')
        console.log(bookerData)
        console.log('-----------------------')
        //let bookerData
        return res.render('editbooker.ejs', {
            booker: bookerData
        });
    }else{
        return res.send('Booker not found!');
    }
}
let putbooker = async(req, res) => {
    let data = req.body;
    let allBookers = await nguoidatveService.updateBookerData(data);
    return res.render('displaybooker.ejs', {
        dataTable: allBookers
    });
}
let deletebooker = async(req, res) => {
    let id = req.query.id;
    if(id){
        await nguoidatveService.deleteBookerById(id);
        return res.send('Xoá người đặt vé thành công!')
    }else{
        return res.send('Người đặt vé không tồn tại!')
    }
    
}
module.exports={
    dangKy :dangKy,
    dangNhap :dangNhap,
    completeRegister :completeRegister,
    insertUser :insertUser,
    thaydoithongtin :thaydoithongtin,
    capnhatthongtin: capnhatthongtin, 
    chuanbixoa :chuanbixoa, 
    xoaUser :xoaUser, 
    dataBooker :dataBooker,
    completeDatabooker : completeDatabooker,
    displaybooker :displaybooker,
    editbooker :editbooker,
    putbooker :putbooker,
    deletebooker :deletebooker,
}

