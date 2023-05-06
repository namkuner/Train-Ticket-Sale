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
            thoiGianDi: {
                type: Sequelize.DATE
            },
            thoiGianDen: {
                type: Sequelize.DATE
            },
            // giaVe: {
            //     type: Sequelize.STRING
            // },
            soToa: {
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