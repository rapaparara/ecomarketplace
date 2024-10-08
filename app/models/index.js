const sequelize = require('../config/database');
const User = require('./UserModel');

// Inisialisasi semua model
const db = {};
db.Sequelize = sequelize;
db.User = User;

// Sinkronisasi model dengan database
db.Sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

module.exports = db;
