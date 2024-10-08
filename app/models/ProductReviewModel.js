const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const ProductReview = sequelize.define(
   'ProductReview',
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
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
      buyer_id: {
         type: DataTypes.STRING,
         references: {
            model: 'Users',
            key: 'id',
         },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      rating: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      comment: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = ProductReview
