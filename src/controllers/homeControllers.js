import express from "express"
import dangNhapDangKyService from "../services/dangNhapDangKyService"
import tripCRUD from "../services/tripCRUD"

let dangKy = (req, res) => {
    return res.render("dangky.ejs")
}
let dangNhap = (req, res) => {
    return res.render("dangnhap.ejs")

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
let chuanbixoa = async (req, res) => {
    console.log(req.query.id)
    let userid = req.query.id
    let data = await dangNhapDangKyService.infomationUser(userid);
    // let message = await dangNhapDangKyService.xoathongtinuser(userid)
    return res.render("xoaUser.ejs", { user: data })
}
let xoaUser = async (req, res) => {
    let userid = req.body;

    console.log(userid)
    let message = await dangNhapDangKyService.xoathongtinuser(userid)
    // let data = await dangNhapDangKyService.dataUser();
    return res.send("xóa thông tin thành công")
    // return res.render('dataUser.ejs',{user:data})
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

module.exports = {
    //User
    dangKy: dangKy,
    dangNhap: dangNhap,
    completeRegister: completeRegister,
    insertUser: insertUser,
    thaydoithongtin: thaydoithongtin,
    capnhatthongtin: capnhatthongtin,
    chuanbixoa: chuanbixoa,
    xoaUser: xoaUser,

    //Trip
    formCreateTrip: formCreateTrip,
    doneCreateTrip: doneCreateTrip,
    xemTrip: xemTrip,
    getEditTripById: getEditTripById,
    editTripsById: editTripsById,
    updateTrips: updateTrips,
    deleteTrip: deleteTrip,
}

