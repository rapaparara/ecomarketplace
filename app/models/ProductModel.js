const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define(
   'Product',
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      seller_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Users',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      category_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Categories',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      price: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      stock: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = Product
