import db from "../models/index";

let handleSearchTripTrue = (diemXuatPhat, diemDen, ngayKhoiHanh) => {
    return new Promise(async(resolve, reject) => {
        try{
            let tripData = {};
            let KTdiemXuatPhat = await checkUserdiemXuatPhat(diemXuatPhat);////diemXuatPhat
            let KTdiemDen = await checkUserdiemDen(diemDen);////diemDen
            let KTngayKhoiHanh = await checkUserngayKhoiHanh(ngayKhoiHanh);////ngayKhoiHanh
            if(KTdiemXuatPhat){
                //nơi đi có tồn tại
                let trip = await db.Trip.findOne({
                    where: { diemXuatPhat: diemXuatPhat },
                });
                if(trip){
                    //tiếp theo là nơi đến có tồn tại không
                    if(KTdiemDen){
                        let trip = await db.Trip.findOne({
                            //Chỉ xuất ra 'diemXuatPhat', 'diemDen', 'ngayKhoiHanh', 'tenTau'
                            attributes: ['diemXuatPhat', 'diemDen', 'ngayKhoiHanh', 'tenTau'],
                            //
                            where: { diemDen: diemDen },
                            raw: true
                        });
                        if(trip){
                            //tiếp theo là thời gian có tồn tại không
                            if(KTngayKhoiHanh){
                                tripData.errCode = 4;
                                tripData.errMessage = 'Ok',
                                tripData.trip = trip;
                            }else{
                                tripData.errCode = 5;
                                tripData.errMessage = 'Thời gian khởi hành không tồn tại, vui lòng thử lại!';
                            }
                            //
                        }else{
                            tripData.errCode = 2;
                            tripData.errMessage = 'Nơi đến không tồn tại, vui lòng thử lại!';
                        }
                        //
                    }else{
                        tripData.errCode = 3;
                        tripData.errMessage = 'Nơi đến không tồn tại, vui lòng thử lại!';
                    }
                    //
                }else{
                    tripData.errCode = 2;
                    tripData.errMessage = 'Nơi đi không tồn tại, vui lòng thử lại!';
                }
            }else{
                //trả ra lỗi
                tripData.errCode = 1;
                tripData.errMessage = 'Nơi đi không tồn tại, vui lòng thử lại!';  
            }
            resolve(tripData)
        }catch(e) {
            reject(e);
        }
    })
}

/// ĐIỂM ĐI
let checkUserdiemXuatPhat = (userdiemXuatPhat) => {
    return new Promise(async(resolve, reject) => {
        try{
            let trip = await db.Trip.findOne({
                where: { diemXuatPhat: userdiemXuatPhat }
            })
            if(trip){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e) {
            reject(e);
        }
    })
}
///

/// ĐIỂM ĐẾN
let checkUserdiemDen = (userdiemDen) => {
    return new Promise(async(resolve, reject) => {
        try{
            let trip = await db.Trip.findOne({
                where: { diemDen: userdiemDen }
            })
            if(trip){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e) {
            reject(e);
        }
    })
}
///

/// NGÀY KHỞI HÀNH
/*
let checkUserngayKhoiHanh = (userngayKhoiHanh) => {
    return new Promise(async(resolve, reject) => {
        try{
            let trip = await db.Trip.findOne({
                where: { ngayKhoiHanh: userngayKhoiHanh }
            })
            if(trip){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e) {
            reject(e);
        }
    })
}*/
///

let checkUserngayKhoiHanh = (userngayKhoiHanh) => {
    return new Promise(async(resolve, reject) => {
        try{
            let trip = await db.Trip.findOne({
                where: { ngayKhoiHanh: new Date(userngayKhoiHanh.split("-").reverse().join("-")) }
            })
            if(trip){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e) {
            reject(e);
        }
    })
}





module.exports = {
    handleSearchTripTrue: handleSearchTripTrue
}
