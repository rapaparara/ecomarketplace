const sequelize = require('../config/database')
const Cart = require('./CartModel')
const Category = require('./CategoryModel')
const Product = require('./ProductModel')
const ProductReview = require('./ProductReviewModel')
const User = require('./UserModel')

// Inisialisasi semua model
const db = {}
db.Sequelize = sequelize
db.User = User
db.Category = Category
db.Product = Product
db.ProductReview = ProductReview
db.Cart = Cart

// Sinkronisasi model dengan database
db.Sequelize.sync({ force: false }).then(() => {
   console.log('Database & tables created!')
})

module.exports = db
