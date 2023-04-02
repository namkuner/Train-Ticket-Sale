import express from "express"
let dangKy = (req,res)=>{
    return res.render("dangky.ejs")
}

module.exports={
    dangKy :dangKy
}