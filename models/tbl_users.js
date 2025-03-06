'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_users.init({
    id_user: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    namaDepan_user: {
      type: DataTypes.STRING
    },
    namaBelakang_user: {
      type: DataTypes.STRING
    },
    email_user: {
      type: DataTypes.STRING
    },
    password_user: {
      type: DataTypes.TEXT
    },
    refresh_token: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'tbl_users',
  });
  return tbl_users;
};