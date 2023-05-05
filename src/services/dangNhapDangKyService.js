import db from "../models/index"
let createNewUser = (data) =>{
    console.log(data)
    return new Promise(async(reslove, reject)=>{
        try{
            await db.User.create({
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
            let data = await db.User.findAll();
            reslove(data);
        }
        catch(e)
        {
            reject(e);
        }
    })
}

let infomationUser=(userid)=>{
    return new Promise(async(reslove, reject)=>{
        try{
            let data = await db.User.findOne({where:{id: userid}})
            reslove(data);
        }
        catch(e){
            reject(e);
        }
    })
}
let checkdangnhap = (user_password)=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data =await db.User.findOne({where :{phoneNumber: user_password.SDT}})
            if(data)
            {
                if(data.password ==user_password.password)
                {
                    reslove("Bạn đã đăng nhập thành công")
                }
                else{
                    reslove("Mật khẩu bạn bị sai mời nhập lại")
                }
                
            }
            else {
                reslove("tài khoản của bạn không chính xác! xin mời nhập lại")
            }
        }catch(e)
        {reject(e)}
    })
}
let updateUser = async (user) => {
    try {
        let data = await db.User.findOne({where:{id: user.id}});
        console.log(user);
        console.log("data", data);
        if (data) {
            data.firstName = user.firstName;
            data.lastName = user.lastName;
            data.phoneNumber = user.phoneNumber;
            data.password = user.password;
            data.email = user.email;
            data.CMND = user.CMND;
            data.address = user.address;
            data.gender = user.gender;
        }
        await data.save();
    } catch (error) {
        console.log(error);
    }
}

let xoathongtinuser = (dataid)=>
{
    return new Promise(async(reslove,rejcet)=>{
        try{
            let data = await db.User.findOne({where:{id: dataid.id}})
            if(data)
            {data.destroy();
            }
            reslove("bạn đã xóa thông tin thành công ")
        }catch(e)
        {
            rejcet(e)
        }
    })
}
//////////////////////////////////////trang admin
let dataAdmin =()=>{
    return new Promise(async(reslove,reject)=>{
        try{
            let data = await db.User.findAll();
            reslove(data);
        }
        catch(e)
        {
            reject(e);
        }
    })
}
module.exports ={
    createNewUser: createNewUser,
    dataUser:dataUser,
    infomationUser :infomationUser,
    updateUser: updateUser,
    xoathongtinuser:xoathongtinuser,
    checkdangnhap:checkdangnhap,
    //-----thêm dữ liệu tài khoản người dùng vào trang admin
    dataAdmin: dataAdmin,
}