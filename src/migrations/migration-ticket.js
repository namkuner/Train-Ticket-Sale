'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tickets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tenGhe: {
                type: Sequelize.STRING
            },
            trangThai: {
                type: Sequelize.BOOLEAN
            },
            tenGhe: {
                type: Sequelize.STRING
            },
            toa: {
                type: Sequelize.STRING
            },
            giaVe: {
                type: Sequelize.INTEGER
            },
            trainId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tickets');
    }
};