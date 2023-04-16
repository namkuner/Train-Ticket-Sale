//import { Promise } from 'sequelize';
import db from '../models/index';
let createNewBooker = (data) =>{
    return new Promise(async(resolve, reject) => {
        try{
            await db.Inforbooker.create({
                Hoten: data.Hoten,
                Phone: data.Phone,
                Email: data.Email,
                CCCD: data.CCCD,
                Ngaydi: data.Ngaydi,
                Sove: data.Sove,
                Tongtien: data.Tongtien,
            })
            resolve('ok! create a new user succeed!')
        }catch (e) {
            reject(e);
        }
    }) 
     
}

let getAllBooker = () => {
    return new Promise (async(resolve, reject) => {
        try{
            let bookers = db.Inforbooker.findAll({
                raw: true,
            });
            resolve(bookers)
        }catch(e) {
            reject(e)
        }
    })
}
let getBookerInforById = (bookerId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: { id: bookerId},
                raw: true,
            }) 
            if(booker){
                resolve(booker)
            }else{
                resolve({})
            }
        }catch(e){
            reject(e);  
        }
    })
}
let updateBookerData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: { id: data.id }
            })
            if(booker){
                booker.Hoten = data.Hoten;
                booker.CCCD = data.CCCD;
                booker.Email = data.Email;
                booker.Phone = data.Phone;

                await booker.save();
                let allBookers = await db.Inforbooker.findAll();
                resolve(allBookers);
            }else{
                resolve();
            }

        }catch(e) {
            console(e)
        }
    })
}
let deleteBookerById = (bookerId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let booker = await db.Inforbooker.findOne({
                where: {id: bookerId }
            })
            if(booker){
                await booker.destroy();
            }
            resolve();
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewBooker: createNewBooker,
    getAllBooker: getAllBooker,
    getBookerInforById: getBookerInforById,
    updateBookerData: updateBookerData,
    deleteBookerById: deleteBookerById,
}  