const sequelize = require('../config/database')
const CartItem = require('./CartItemModel')
const Cart = require('./CartModel')
const Category = require('./CategoryModel')
const Product = require('./ProductModel')
const ProductReview = require('./ProductReviewModel')
const Transaction = require('./TransactionModel')
const User = require('./UserModel')
const Wishlist = require('./WishlistModel')

// Relasi
User.hasMany(Product,{foreignKey:'seller_id'})
Product.belongsTo(User,{foreignKey:'seller_id'})

Category.hasMany(Product,{foreignKey:'category_id'})
Product.belongsTo(Category,{foreignKey:'category_id'})


// Inisialisasi semua model
const db = {}
db.Sequelize = sequelize
db.User = User
db.Category = Category
db.Product = Product
db.ProductReview = ProductReview
db.Cart = Cart
db.CartItem = CartItem
db.Transaction = Transaction
db.Wishlist = Wishlist

// Sinkronisasi model dengan database
db.Sequelize.sync({ force: false }).then(() => {
   console.log('Database & tables created!')
})

module.exports = db
