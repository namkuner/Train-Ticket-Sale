import express from "express"
import dangNhapDangKyService from "../services/dangNhapDangKyService"
let dangKy = (req,res)=>{
    return res.render("dangky.ejs")
}
let dangNhap = (req, res)=>{

    return res.render("dangnhap.ejs")
    
}
let loginn = async (req,res)=>{
    let SDT_password =req.body;
    console.log(SDT_password)
    let error = await dangNhapDangKyService.checkdangnhap(SDT_password)
    console.log(error)
    if(error=="Bạn đã đăng nhập thành công")
    {
        return res.redirect('/')
    }
    else
    {
        res.render("dangnhap.ejs", {er :error})
    }

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
let xemtruocuser = async(req,res)=>{
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    console.log(data)
    // let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.render('xoaUser.ejs', {user :data})
}
let xoaiduser = async(req,res)=>{
    let userid =req.body;
    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    // let data = await dangNhapDangKyService.dataUser();
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
    xoaiduser :xoaiduser,
    loginn :loginn,
    xemtruocuser :xemtruocuser ,

}

