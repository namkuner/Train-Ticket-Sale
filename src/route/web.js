import express from "express";
import homeControllers from "../controllers/homeControllers";
let router = express.Router();

let initWebRouters = (app) => {
    //USER
    router.get('/', homeControllers.dangKy);
    router.get('/dangky', homeControllers.dangKy);
    router.post('/complete-register', homeControllers.completeRegister);   
    router.get('/dangnhap', homeControllers.dangNhap);
    router.post('/login',homeControllers.loginn)
    router.get('/dataUser', homeControllers.insertUser);
    router.get('/editUser',homeControllers.thaydoithongtin);
    router.post('/updatethongtinUser',homeControllers.capnhatthongtin);
    router.get('/xemtruockhixoa',homeControllers.xemtruocuser);
    router.post('/xoa-user',homeControllers.xoaiduser);

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

    return app.use("/", router);

}

module.exports = initWebRouters;