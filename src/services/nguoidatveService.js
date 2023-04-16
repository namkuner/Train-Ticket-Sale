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

module.exports = {
    createNewBooker: createNewBooker,
    getAllBooker: getAllBooker,
}