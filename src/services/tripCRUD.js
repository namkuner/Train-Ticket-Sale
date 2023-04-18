import db from "../models/index"

let createNewTrip = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Trip.create({
                diemXuatPhat: data.diemXuatPhat,
                diemDen: data.diemDen,
                ngayKhoiHanh: data.ngayKhoiHanh,
                giaVe: data.giaVe,
                trangThai: data.trangThai,
                tenToa: data.tenToa,
                tenTau: data.tenTau,
            })
            resolve("Tạo chuyến mới thành công")
        }
        catch (e) {
            reject(e)
        }
    })
}
let getAllDataTrip = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findAll();
            resolve(data)
        }
        catch (e) {
            reject(e);
        }
    })
}

let getTripInforById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trip = await db.Trip.findOne({
                where: { id: tripId },
                raw: true
            })
            if (trip) {
                resolve(trip)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}


let updateTrip = async (trip) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Trip.findOne({ where: { id: trip.id } });
            if (data) {
                data.diemXuatPhat = trip.diemXuatPhat;
                data.diemDen = trip.diemDen;
                data.ngayKhoiHanh = trip.ngayKhoiHanh;
                data.giaVe = trip.giaVe;
                data.trangThai = trip.trangThai;
                data.tenToa = trip.tenToa;
                data.tenTau = trip.tenTau;
                await data.save();
                let allTrip = await db.Trip.findAll()
                resolve(allTrip)
            }
        } catch (error) {
            console.log(error);
        }
    })

}

let deteleTripById = (tripId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let trip = await db.Trip.findOne({
                where: { id: tripId }
            })
            if (trip) {
                await trip.destroy()
            }
            resolve() //=return
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllDataTrip: getAllDataTrip,
    createNewTrip: createNewTrip,
    updateTrip: updateTrip,
    getTripInforById: getTripInforById,
    deteleTripById: deteleTripById
}