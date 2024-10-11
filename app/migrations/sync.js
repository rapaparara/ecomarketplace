const db = require('../models')

db.Sequelize.sync({ force: false }).then(() => {
   console.log('Database & tables created!')
})
