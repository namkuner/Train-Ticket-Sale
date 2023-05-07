'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password : DataTypes.STRING,
    email: DataTypes.STRING,
    CMND :  DataTypes.STRING,
    address : DataTypes.STRING,
    gender : DataTypes.STRING,
    roleID : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};