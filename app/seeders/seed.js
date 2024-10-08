const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelize = require('../config/database');

const runSeeders = async () => {
  const umzug = new Umzug({
    migrations: {
      glob: '../seeders/20241007120204-demo-user.js',  // Tentukan folder seeders
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'SequelizeData' }),  // Simpan status di database
    context: sequelize.getQueryInterface(),
    logger: console,  // Log untuk console
  });

  // Jalankan seeder
  await umzug.up();
};

// Eksekusi seeder ketika aplikasi dijalankan
runSeeders().then(() => {
  console.log('Seeders executed successfully!');
}).catch((err) => {
  console.error('Seeding failed:', err);
});

module.exports = runSeeders