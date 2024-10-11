const express = require('express')
const app = express()
const indexRoutes = require('./routes/indexRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const ProductReviewRoutes = require('./routes/ProductReviewRoutes')
const CartRoutes = require('./routes/CartRoutes')

app.use(express.json())
app.use('/index', indexRoutes)
app.use('/users', UserRoutes)
app.use('/categories', CategoryRoutes)
app.use('/products', ProductRoutes)
app.use('/product-reviews', ProductReviewRoutes)
app.use('/carts', CartRoutes)

module.exports = app
