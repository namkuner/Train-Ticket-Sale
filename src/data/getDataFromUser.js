import db from "../models/index";
import fs from "fs";

// Thêm dữ liệu vào bảng "Trips"
db.Trip.findAll()
    .then((trips) => {
        // Chuyển đổi kết quả truy vấn thành JSON và ghi vào file
        const jsonTrips = JSON.stringify(trips);
        fs.writeFile('../trip.json', jsonTrips, function (err) {
            if (err) throw err;
            console.log('Data saved to file');
        });
    })
    .catch((error) => {
        console.log("Error occurred:", error);
    });






