import db from "../models/index";

let checkUserdiemXuatPhat = async (userdiemXuatPhat) => {
  try {
      let trip = await db.Trip.findOne({
          where: { diemXuatPhat: userdiemXuatPhat }
      });
      return trip ? true : false;
  } catch (e) {
      throw e;
  }
};

let checkUserdiemDen = async (userdiemDen) => {
  try {
      let trip = await db.Trip.findOne({
          where: { diemDen: userdiemDen }
      });
      return trip ? true : false;
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
      let tripData = {};
      console.log('1')
      let KTdiemXuatPhat = await checkUserdiemXuatPhat(diemXuatPhat);
      console.log(KTdiemXuatPhat)
      
      let KTdiemDen = await checkUserdiemDen(diemDen);
      // let KTngayKhoiHanh = await checkUserngayKhoiHanh(ngayKhoiHanh);
      
      if (KTdiemXuatPhat) {
        // Nơi xuất phát tồn tại
        let tripXuatPhat = await db.Trip.findOne({
          where: { diemXuatPhat: diemXuatPhat },
        });
  
        if (tripXuatPhat) {
          if (KTdiemDen) {
            // Nơi đến tồn tại
            let tripDen = await db.Trip.findOne({
              attributes: ['diemXuatPhat', 'diemDen', 'ngayKhoiHanh', 'tenTau'],
              where: { diemDen: diemDen },
              raw: true,
            });
  
            if (tripDen) {
              // if (KTngayKhoiHanh) {
              //   tripData.errCode = 4;
              //   tripData.errMessage = 'Ok';
              //   tripData.trip = tripDen;
              // } else {
              //   tripData.errCode = 5;
              //   tripData.errMessage = 'Thời gian khởi hành không tồn tại, vui lòng thử lại!';
              // }
            } else {
              tripData.errCode = 3;
              tripData.errMessage = 'Nơi đến không tồn tại, vui lòng thử lại!';
            }
          } else {
            tripData.errCode = 3;
            tripData.errMessage = 'Nơi đến không tồn tại, vui lòng thử lại!';
          }
        } else {
          tripData.errCode = 2;
          tripData.errMessage = 'Nơi đi không tồn tại, vui lòng thử lại!';
        }
      } else {
        tripData.errCode = 1;
        tripData.errMessage = 'Nơi đi không tồn tại, vui lòng thử lại!';
      }
      console.log(tripData)
      return tripData;
    } catch (e) {
      throw e;
    }
  };
  






module.exports = {
    handleSearchTripTrue: handleSearchTripTrue
}
