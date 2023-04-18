'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Trip.init({
        diemXuatPhat: DataTypes.STRING,
        diemDen: DataTypes.STRING,
        ngayKhoiHanh: DataTypes.DATE,
        giaVe: DataTypes.STRING,
        trangThai: DataTypes.BOOLEAN,
        tenToa: DataTypes.STRING,
        tenTau: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Trip',
    });
    return Trip;
};