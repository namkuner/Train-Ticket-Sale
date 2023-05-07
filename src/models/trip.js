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
        thoiGianDi: DataTypes.DATE,
        thoiGianDen: DataTypes.DATE,
        // giaVe: DataTypes.STRING,
        tenTau: DataTypes.STRING,
        soToa: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Trip',
    });
    return Trip;
};


/*
'use strict';
const {
    Model
} = require('sequelize');
const { isDate } = require('lodash');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
      /*  static associate(models) {
            // define association here
        }
    };
    Trip.init({
        diemXuatPhat: DataTypes.STRING,
        diemDen: DataTypes.STRING, 
        ngayKhoiHanh: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
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
*/