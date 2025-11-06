'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          name: 'Mariana Silva',
          phone: '55981234567',
          email: 'mariana.silva@example.com',
          hashed_password:
            '$2b$08$/3/pijzIF.5DXjK1.jvAE.ROlPs7V4OZnRb321xMSzieKfomcPZ1O',
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Lucas Pereira',
          phone: '55982123456',
          email: 'lucas.pereira@example.com',
          hashed_password:
            '$2b$08$.jv4bwNCpw/pUhZ1atXy9.JrLyaDhV5/YDC6/BrJxW7g7hzdztjzW',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Ana Costa',
          phone: '55983123455',
          email: 'ana.costa@example.com',
          hashed_password:
            '$2b$08$ACUx4XORcbUPxQvIa/ja7OjQ.L4G4dy95.2qFkeaNgI5QwQTaXiiS',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Pedro Rocha',
          phone: '55984123454',
          email: 'pedro.rocha@example.com',
          hashed_password:
            '$2b$08$eRqAiitWTBPatg7AkE8uYeio2lXxkNPy/Fd9t.q/techBg0Onfck6',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Beatriz Almeida',
          phone: '55985123453',
          email: 'beatriz.almeida@example.com',
          hashed_password:
            '$2b$08$1uu8SU//vmxNo8iRI3EeP.Fhi2Ksgp1lSBZRVbaNiPlhgFUbFO0z2',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Rafael Gonçalves',
          phone: '55986123452',
          email: 'rafael.goncalves@example.com',
          hashed_password:
            '$2b$08$bzr2ujffIQjFptyqhYUezetkD2sGOS3lVmhdFZ48gPv98w4XjSQTq',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: 'Carolina Mendes',
          phone: '55987123451',
          email: 'carolina.mendes@example.com',
          hashed_password:
            '$2b$08$ad4O3LXCmS7OoHsqwF1yKe/X.xDqZbiDdbQ/F6Ghcjv58FBB.ztuy',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: 'Thiago Fernandes',
          phone: '55988123450',
          email: 'thiago.fernandes@example.com',
          hashed_password:
            '$2b$08$UUHHQDs3Lqj/uYl3JnWJq.A14oUTk7JSUtJwWYzoPCBQAQ80sHCGO',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: 'Sofia Ramos',
          phone: '55989123449',
          email: 'sofia.ramos@example.com',
          hashed_password:
            '$2b$08$eSOl0ST6PYLKcKXaGYRWAuZRbFn9k/LmNXjcQyIbYzk7PtaVRUpb6',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          name: 'Gustavo Lima',
          phone: '55980123448',
          email: 'gustavo.lima@example.com',
          hashed_password:
            '$2b$08$IJ9r8IIeD0mo7NMaXGQXw.9ELE1CWYgP97Eu37k9WC0QWbLDjBHHK',
          role: 'user',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
