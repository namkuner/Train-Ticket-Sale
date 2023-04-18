'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('trips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            diemXuatPhat: {
                type: Sequelize.STRING
            },
            diemDen: {
                type: Sequelize.STRING
            },
            ngayKhoiHanh: {
                type: Sequelize.DATE
            },
            giaVe: {
                type: Sequelize.STRING
            },
            trangThai: {
                type: Sequelize.BOOLEAN
            },
            tenToa: {
                type: Sequelize.STRING
            },
            tenTau: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('trips');
    }
};