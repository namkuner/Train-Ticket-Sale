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
const tongsovebantheodiemdi = async (diemDi) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemXuatPhat$': diemDi,
      },
      include: [
        {
          model: db.Trip,
          as: 'train',
          attributes: ["diemXuatPhat","thoiGianDi","tenTau"],
        }
      ]
    });

    return result;
  } catch (e) {
    throw e;
  }
};
const tongsovebantheodiemden = async (diemDen) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemDen$': diemDen,
      },
      include: [
        {
          model: db.Trip,
          as: 'train',
          attributes: ["diemDen","thoiGianDi","tenTau"],
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
    const distinctDiemXuatPhat = await db.Trip.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('diemXuatPhat')), 'diemXuatPhat'],
      ],
      // raw: true,
    });
    console.log(distinctDiemXuatPhat)

    const result = {};
    for (const { diemXuatPhat } of distinctDiemXuatPhat) {
      const tongSoVe = await tongsovebantheodiemdi(diemXuatPhat);
      result[diemXuatPhat] = tongSoVe;
      console.log("tongSoVe",tongSoVe)
    }
    const sortedResult = {};
Object.keys(result).sort().forEach((key) => {
  sortedResult[key] = result[key];
});

    return sortedResult;
  } catch (e) {
    throw e;
  }
};
const findby2chieu = async (diemXuatPhat,diemDen) => {
  try {
    const result = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.diemDen$': diemDen,
        '$train.diemXuatPhat$': diemXuatPhat,
      },
        include: [
          {
            model: db.Trip,
            as: 'train',
            attributes: ["diemXuatPhat","thoiGianDi","tenTau"],
          }
        ]
      });
  
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