import db from "../models/index"
let createNewUser = (data) =>{
    console.log(data)
    return new Promise(async(reslove, reject)=>{
        try{
            await db.user.create({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                password : data.password,
                email:data.email,
                CMND :  data.CMND,
                address :data.address,
                gender : data.gender,
                roleID : data.roleID,
            })
            reslove("Đã tạo người dùng mới thành công");
        }
        catch(e)
        {
            reject(e);
        }
    })
}
let dataUser =()=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data = db.User.findAll();
            reslove(data);
        }
        catch(e)
        {
            reject(e);
        }
    })
}

let infomationUser=(id)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = db.User.findOne({where:{id: id}})
            reslove(data);
        }
        catch(e){
            reject(e);
        }
    })
}
let updateUser =(user)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = db.User.findOne({where:{id: user.id}})
            console.log("data",data)
            if(data){
                data.firstName = user.firstName,
                data.lastName = user.lastName,
                data.phoneNumber = user.phoneNumber,
                data.password =  user.password,
                data.email = user.email,
                data.CMND =  user.CMND,
                data.address = user.address,
                data.gender = user.gender,
                await data.save();

            }
            reslove();
        }
        catch(e){
            reject(e);
        }
    })
}
module.exports ={
    createNewUser: createNewUser,
    dataUser:dataUser,
    infomationUser :infomationUser,
    updateUser: updateUser,
}