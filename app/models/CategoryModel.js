const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Category = sequelize.define(
   'Category',
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = Category
