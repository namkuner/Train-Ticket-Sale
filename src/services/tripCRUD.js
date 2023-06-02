import db from "../models/index"
const { Op } = require('sequelize');


let createNewTrip = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Trip.create({
                diemXuatPhat: data.diemXuatPhat,
                diemDen: data.diemDen,
                thoiGianDi: data.thoiGianDi,
                thoiGianDen: data.thoiGianDen,
                giaVe: data.giaVe,
                tenTau: data.tenTau,
                soToa: data.soToa,
                soGhe: data.soGhe,
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
                console.log(trip)
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
            let data = await db.Trip.findOne({
                where: { id: trip.id }
            });
            if (data) {
                data.diemXuatPhat = trip.diemXuatPhat;
                data.diemDen = trip.diemDen;
                data.thoiGianDi = trip.thoiGianDi;
                data.thoiGianDen = trip.thoiGianDen;
                data.giaVe = trip.giaVe;
                data.tenTau = trip.tenTau;
                data.soToa = trip.soToa;
                data.soGhe = trip.soGhe;
                await data.save();
                let allTrip = await db.Trip.findAll()
                resolve(allTrip)
            }
        } catch (error) {
            reject(error)
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

let searchTrips = async (keyword) => {
    try {
        const searchResults = await db.Trip.findAll({
            where: {
                [Op.or]: [
                    { diemXuatPhat: { [Op.like]: `%${keyword}%` } },
                    { diemDen: { [Op.like]: `%${keyword}%` } },
                ]
            },
        });
        
        console.log(searchResults)
        return searchResults;
    } catch (e) {
        // throw new Error('Lỗi khi tìm kiếm lịch trình');\
        console.log(e)
    }
}

module.exports = {
    getAllDataTrip: getAllDataTrip,
    createNewTrip: createNewTrip,
    updateTrip: updateTrip,
    getTripInforById: getTripInforById,
    deteleTripById: deteleTripById,
    searchTrips: searchTrips
}