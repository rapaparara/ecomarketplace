const express = require('express')
const app = express()
const indexRoutes = require('./routes/indexRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use(express.json())
app.use('/index', indexRoutes)
app.use('/users', UserRoutes)

module.exports = app
