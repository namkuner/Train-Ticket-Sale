import  express  from "express";
import homeControllers from "../controllers/homeControllers";
let router =express.Router();

let initWebRouters =(app)=>{
    router.get('/', homeControllers.dangKy);
    router.get('/dangky', homeControllers.dangKy);
    router.post('/complete-register', homeControllers.completeRegister);
    router.get('/dangnhap', homeControllers.dangNhap);
    router.get('/dataUser', homeControllers.insertUser);
    router.get('/editUser',homeControllers.thaydoithongtin);
    router.post('/updatethongtinUser',homeControllers.capnhatthongtin);
    router.get('/post-delete',homeControllers.chuanbixoa);
    router.post('/deleteUser',homeControllers.xoaUser);
    return app.use("/", router);

}

module.exports = initWebRouters;