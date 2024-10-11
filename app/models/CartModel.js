const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Cart = sequelize.define(
   'Cart',
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      buyer_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Users',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      total_price: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = Cart
