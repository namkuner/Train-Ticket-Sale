import express from "express"
import dangNhapDangKyService from "../services/dangNhapDangKyService"
let dangKy = (req,res)=>{
    return res.render("dangky.ejs")
}
let dangNhap = (req, res)=>{
    return res.render("dangnhap.ejs")
    
}
let completeRegister =async(req, res)=>{
    let message = await dangNhapDangKyService.createNewUser(req.body); // req.body la data nguoi nhap
    console.log(message);
    return res.send("Chúc mừng bạn đã đăng kí thành công!")
}
let insertUser = async(req, res)=>{
    let data = await dangNhapDangKyService.dataUser();
    return res.render('dataUser.ejs',{user:data})
}

let thaydoithongtin = async(req,res)=>{
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    return res.render("editUser.ejs",{user:data})
}
let capnhatthongtin = async(req,res)=>{
    let user = req.body;
    console.log(user);
    let message = dangNhapDangKyService.updateUser(user);
    return res.send("Cập nhật thông tin thành công")
}
let preDelete = async(req,res)=>{
    console.log(req.query.id)
    let userid = req.query.id
    // let data = await dangNhapDangKyService.infomationUser(userid);
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.send("bạn đã xóa thành công")
}
let xoaUser = async(res,req)=>{
    let userid =req.body;
    
    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    let data = await dangNhapDangKyService.dataUser();
    return res.send("Xoa thông tin thành công ")
    // return res.render('dataUser.ejs',{user:data})
}
module.exports={
    dangKy :dangKy,
    dangNhap :dangNhap,
    completeRegister :completeRegister,
    insertUser :insertUser,
    thaydoithongtin :thaydoithongtin,
    capnhatthongtin: capnhatthongtin,
    xoaUser :xoaUser,
    preDelete :preDelete ,

}

