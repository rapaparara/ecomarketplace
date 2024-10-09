const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Transaction = sequelize.define(
   'Transaction',
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
      payment_method: {
         type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
         allowNull: false,
      },
      payment_status: {
         type: DataTypes.ENUM('paid', 'unpaid'),
         allowNull: false,
      },
      shipping_address: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      shipping_status: {
         type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = Transaction
