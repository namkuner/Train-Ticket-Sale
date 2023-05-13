'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Train extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Train.hasMany(models.Ticket, {
                as: "tickets",
                foreignKey: 'trainId'
            })
        }
    };
    Train.init({
        ten: DataTypes.STRING,
        xuatPhat: DataTypes.STRING,
        diemDen: DataTypes.STRING,
        soGhe: DataTypes.INTEGER,
        // giaVe: DataTypes.STRING,
        thoiGianDi: DataTypes.DATE,
        thoiGianDen: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Train',
    });
    return Train;
};
