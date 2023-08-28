'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" })
    }
  }
  Product.init({
    categoryId: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};