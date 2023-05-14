import db from '../models/index';

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

let checkUserdiemDen = async (userdiemDen,diemXuatPhat) => {
  try {
    let trip = await db.Trip.findAll({
      where:
        {diemDen : userdiemDen,
          diemXuatPhat:diemXuatPhat}
      
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
  






module.exports = {
    handleSearchTripTrue: handleSearchTripTrue
}
