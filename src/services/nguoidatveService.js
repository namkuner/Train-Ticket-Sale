//import { Promise } from 'sequelize';
import db from '../models/index';


let createNewBooker = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });
      const bookerId = newBooker.id; 
      const ticketIds = ['219', '220', '221']; 

      for (const ticketId of ticketIds) {
        const bookingData = {
          customerId: bookerId, 
          ticketId: ticketId, 
        };
        await db.Bookingg.create(bookingData);

        await db.Ticket.update(
          { trangThai: 0 }, // Dữ liệu cần cập nhật
          { where: { id: ticketId } } // Điều kiện để xác định vé cần cập nhật
        );
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    }
  });
};

//createNewBooker(data); // Thay data bằng dữ liệu thích hợp của bạn


/*
let createNewBooker = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newBooker = await db.Inforbooker.create({
          Hoten: data.Hoten,
          Phone: data.Phone,
          Email: data.Email,
          CCCD: data.CCCD,
          Ngaydi: data.Ngaydi,
          Sove: data.Sove,
          Tongtien: data.Tongtien,
        });
  
        const customerId = newBooker.id;
  
        const ticketIds = data.id; // Chuỗi ID vé (ví dụ: "1,2,3,...")
        const ticketIdArray = ticketIds.split(',');
  
        for (const ticketId of ticketIdArray) {
          const bookingData = {
            customerId: customerId,
            ticketId: ticketId.toString(),
          };
  
          await db.Bookingg.create(bookingData);
        }
       // await db.Bookingg.create(bookingData);
  
        resolve('ok! create a new user succeed!');
      } catch (e) {
        reject(e);
      }
    });
  };
  */





/*

let createNewBooker = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBooker = await db.Inforbooker.create({
        Hoten: data.Hoten,
        Phone: data.Phone,
        Email: data.Email,
        CCCD: data.CCCD,
        Ngaydi: data.Ngaydi,
        Sove: data.Sove,
        Tongtien: data.Tongtien,
      });

      const bookerId = newBooker.id; // Lưu ID người đặt vé


      // Sử dụng vòng lặp để lặp qua từng giá trị ID vé và tạo các bản ghi Bookingg tương ứng
      const ticketIds = ['219', '220', '221']; // Các giá trị ID vé từ URL

// Lặp qua danh sách các ID vé
for (const ticketId of ticketIds) {
  const bookingData = {
    customerId: bookerId, // Lưu ID người đặt vé
    ticketId: ticketId, // Lưu ID vé
  };

        await db.Bookingg.create(bookingData);
      }

      resolve('ok! create a new user succeed!');
    } catch (e) {
      reject(e);
    }
  });
};
*/

  


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
            console.log(e); // Sửa từ console(e) thành console.log(e)
            reject(e);
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