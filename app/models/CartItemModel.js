const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const CartItem = sequelize.define(
   'CartItem',
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      cart_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Carts',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      product_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Products',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      price: {
         type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = CartItem
