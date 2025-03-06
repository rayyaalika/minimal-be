"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_products.init(
    {
      id_products: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      kode_products: {
        type: DataTypes.STRING,
      },
      nama_products: {
        type: DataTypes.STRING,
      },
      kategori_products: {
        type: DataTypes.ENUM("Makanan", "Minuman", "Snack"),
      },
      harga_products: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "tbl_products",
    }
  );
  return tbl_products;
};
