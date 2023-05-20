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

<<<<<<< HEAD
=======
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
  } catch (error) {
    throw error;
  }
};
const totalSoldTickets = async () => {
  try {
    const total = await db.Ticket.sum('trangthai');
    return total;
  } catch (error) {
    throw error;
  }
};

const tonghopvetaufromdaytoday = async (date1, date2) => {
  try {
    const tickets = await db.Ticket.findAll({
      where: {
        trangthai: 1,
        '$train.thoiGiandi$': {
          [Op.between]: [date1, date2]
        }
      },
      include: [
        {
          model: db.Trip,
          as: 'train',
          attributes: ["diemXuatPhat","diemDen","tenTau","thoiGianDi"]
        }
      ]
    });

    // const totalTickets = tickets.length;
    return tickets;
  } catch (e) {
    throw e;
  }
};
const getAllDistinctDiemXuatPhat = async () => {
  try {
    const distinctDiemXuatPhat = await db.Trip.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('diemXuatPhat')), 'diemXuatPhat']
      ]
    });

    const diemXuatPhatList = distinctDiemXuatPhat.map(item => item.diemXuatPhat);

    return diemXuatPhatList;
  } catch (error) {
    throw error;
  }
};
const getAllDistinctDiemDen = async () => {
  try {
    const distinctDiemXuatPhat = await db.Trip.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('diemDen')), 'diemDen']
      ]
    });

    const diemXuatPhatList = distinctDiemXuatPhat.map(item => item.diemXuatPhat);

    return diemXuatPhatList;
  } catch (error) {
    throw error;
  }
};
const countTicketsByTrainId = async () => {
  try {
    const distinctTrainIds = await db.Train.distinct('id');
    const counts = {};

    for (const trainId of distinctTrainIds) {
      const count = await db.Ticket.count({
        where: {
          trainId: trainId,
          trangthai: 1
        }
      });

      counts[trainId] = count;
    }

    return counts;
  } catch (error) {
    throw error;
  }
};
const getTotalTicketsByRoute = async () => {
  try {
    const result = await db.Ticket.findAll({
      attributes: [
        [db.sequelize.literal('train.diemXuatPhat'), 'diemXuatPhat'],
        [db.sequelize.literal('train.diemDen'), 'diemDen'],
        [db.sequelize.fn('sum', db.sequelize.col('trangThai')), 'totalTickets']
      ],
      include: [
        {
          model: db.Trip,
          attributes: [],
          as: 'train'
        }
      ],
      where: {
        trangThai: 1
      },
      group: ['train.diemXuatPhat', 'train.diemDen'],
      order: [[db.sequelize.literal('totalTickets'), 'DESC']]
    });

    return result;
  } catch (error) {
    throw error;
  }
};

>>>>>>> 86b7069a9bf146350b2a24ac3e167d39f257d234
module.exports = {
    handleSearchTripTrue: handleSearchTripTrue,
    tongsoveban:tongsoveban,
    tongsovebantheodiemdi:tongsovebantheodiemdi,
    alltongsovebantheodiemdi:alltongsovebantheodiemdi,
<<<<<<< HEAD
=======
    tonghopvetaufromdaytoday:tonghopvetaufromdaytoday,
    tongsovebantheodiemden:tongsovebantheodiemden,
    findby2chieu:findby2chieu,
    getTotalTicketsByRoute:getTotalTicketsByRoute
>>>>>>> 86b7069a9bf146350b2a24ac3e167d39f257d234
}