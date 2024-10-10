const express = require('express')
const app = express()
const indexRoutes = require('./routes/indexRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const ProdcutRoutes = require('./routes/ProductRoutes')
const ProductReviewRoutes = require('./routes/ProductReviewRoutes')

app.use(express.json())
app.use('/index', indexRoutes)
app.use('/users', UserRoutes)
app.use('/categories', CategoryRoutes)
app.use('/products', ProdcutRoutes)
app.use('/product-reviews', ProductReviewRoutes)

module.exports = app
