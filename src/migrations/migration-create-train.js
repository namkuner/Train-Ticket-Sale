'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('trains', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ten: {
                type: Sequelize.STRING
            },
            xuatPhat: {
                type: Sequelize.STRING
            },
            diemDen: {
                type: Sequelize.STRING
            },
            soGhe: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('trains');
    }
};