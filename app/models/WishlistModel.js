const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Wishlist = sequelize.define(
   'Wishlist',
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
      product_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Products',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
   },
   {
      timestamps: true,
   }
)

module.exports = Wishlist
