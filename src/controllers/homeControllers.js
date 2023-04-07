import express from "express"
let dangKy = (req,res)=>{
    return res.render("dangky.ejs")
}
let dangNhap = (req, res)=>{
    return res.render("dangnhap.ejs")
    
}
module.exports={
    dangKy :dangKy,
    dangNhap :dangNhap,
}

