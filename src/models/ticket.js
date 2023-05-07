'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Ticket.belongsTo(models.Train, {
                foreignKey: 'trainId'
            })
        }
    };
    Ticket.init({
        trangThai: DataTypes.BOOLEAN,
        toa: DataTypes.STRING,
        giaVe: DataTypes.INTEGER,
        trainId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Ticket',
    });
    return Ticket;
};