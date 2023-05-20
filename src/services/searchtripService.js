import db from '../models/index';
const { Sequelize, Model, DataTypes } = require('sequelize');


let checkUserdiemXuatPhat = async (userdiemXuatPhat) => {
  try {
      let trip = await db.Trip.findAll({
          where: { diemXuatPhat: userdiemXuatPhat }
      });
      return trip;
  } catch (e) {
      throw e;
  }
};

const { Op } = require('sequelize');

let checkUserdiemDen = async (userdiemDen, userdiemXuatPhat) => {
  try {
    const currentTime = new Date();
    
    let trip = await db.Trip.findAll({
      where: {
        diemXuatPhat: userdiemXuatPhat,
        diemDen: userdiemDen,
        thoiGianDi: {
          [Op.gt]: currentTime
        }
      }
    });

    return trip;
  } catch (e) {
    throw e;
  }
};
// let checkUserngayKhoiHanh = async (userngayKhoiHanh) => {
//   try {
//       let trip = await db.Trip.findOne({
//           where: { ngayKhoiHanh: new Date(userngayKhoiHanh.split("-").reverse().join("-")) }
//       });
//       return trip ? true : false;
//   } catch (e) {
//       throw e;
//   }
// };

let handleSearchTripTrue = async (diemXuatPhat, diemDen, ngayKhoiHanh) => {
    try {
      let tripData= {};
      console.log("diemXuatPhat",diemXuatPhat)
      let KTdiemXuatPhat = await checkUserdiemXuatPhat(diemXuatPhat);
      
      if (KTdiemXuatPhat != null) {
        // Nơi xuất phát tồn tại
        let tripDen = await checkUserdiemDen(diemDen,diemXuatPhat)
  
        
          if (tripDen != null) {
              
            return tripDen;

          } else {
           
            tripData.errCode = 2;
            tripData.errMessage = 'Hiện tại đã hết vé ĐẾN ' + diemDen;
            return tripData;
          }
        } 

      else {
        tripData.errCode = 1;
        tripData.errMessage = 'Hiện tại đã hết vé ĐI từ ' +diemXuatPhat;
        return tripData;
      }
      
    } catch (e) {
      throw e;
    }
  };
let tongsoveban = async () => {
  try {
    const count = await db.Ticket.count({
      where: {
        trangthai: 1
      }
    });

    return count;
  } catch (error) {
    throw error;
  }
};
const tongsovebantheodiemdi = async (diemXuatPhat) => {
  try {
    const result = await db.Ticket.count({
      where: {
        trangthai: 1,
        '$train.diemXuatPhat$': diemXuatPhat
      },
      include: [
        {
          model: db.Train,
          as: 'train',
          attributes: [],
        }
      ]
    });

    return result;
  } catch (e) {
    throw e;
  }
};
const alltongsovebantheodiemdi = async () => {
  try {
    const distinctDiemXuatPhat = await db.Train.distinct('diemXuatPhat');

    const result = {};
    for (const diemXuatPhat of distinctDiemXuatPhat) {
      const tongSoVe = await tongsovebantheodiemdi(diemXuatPhat);
      result[diemXuatPhat] = tongSoVe;
    }

    return result;
  } catch (e) {
    throw e;
  }
};

module.exports = {
    handleSearchTripTrue: handleSearchTripTrue,
    tongsoveban:tongsoveban,
    tongsovebantheodiemdi:tongsovebantheodiemdi,
    alltongsovebantheodiemdi:alltongsovebantheodiemdi,
}