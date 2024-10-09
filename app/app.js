const express = require('express')
const app = express()
const indexRoutes = require('./routes/indexRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const ProdcutRoutes = require('./routes/ProductRoutes')

app.use(express.json())
app.use('/index', indexRoutes)
app.use('/users', UserRoutes)
app.use('/categories', CategoryRoutes)
app.use('/products', ProdcutRoutes)

module.exports = app
