const bcryptjs = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import('nanoid');
    const hashedPassword = await bcryptjs.hash('admin', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: nanoid(), 
          username: 'admin',
          password: hashedPassword, 
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    console.log('User seeder completed.');
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
