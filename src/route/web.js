import  express  from "express";
import homeControllers from "../controllers/homeControllers";
let router =express.Router();

let initWebRouters =(app)=>{
    router.get('/', homeControllers.dangKy);
    router.get('/dangky', homeControllers.dangKy);
    return app.use("/", router);

}

module.exports = initWebRouters;