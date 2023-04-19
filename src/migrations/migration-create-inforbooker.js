'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inforbookers', {
      id: {
        //Hoten: DataTypes.STRING,
        //Phone: DataTypes.INTEGER,
        //Email: DataTypes.STRING,
        //CCCD: DataTypes.INTEGER,
        //Ngaydi: DataTypes.DATE,
        //Sove: DataTypes.INTEGER,
        //Tongtien: DataTypes.INTEGER,
    
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Hoten: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.INTEGER
      },
      Email: {
        type: Sequelize.STRING
      },
      CCCD: {
        type: Sequelize.INTEGER
      },
      Ngaydi: {
        type: Sequelize.DATE
      },
      Sove: {
        type: Sequelize.INTEGER
      },
      Tongtien: {
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
    await queryInterface.dropTable('Inforbookers');
  }
};