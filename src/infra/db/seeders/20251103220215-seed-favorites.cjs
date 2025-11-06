'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Favorites',
      [
        {
          user_id: 1,
          listing_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          listing_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          listing_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 2,
          listing_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          listing_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          listing_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          listing_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 3,
          listing_id: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          listing_id: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 4,
          listing_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          listing_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          listing_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 5,
          listing_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          listing_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          listing_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          listing_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 6,
          listing_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          listing_id: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 7,
          listing_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          listing_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          listing_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 8,
          listing_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          listing_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          listing_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 9,
          listing_id: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 9,
          listing_id: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          user_id: 10,
          listing_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 10,
          listing_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 10,
          listing_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 10,
          listing_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};
