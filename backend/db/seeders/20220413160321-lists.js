'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Lists', [
    {
      userId: 1,
      title: "Movies I need to see",
      type: "Movies"
    },
    {
      userId: 1,
      title: "Food I need to eat",
      type: "Food"
    },
    {
      userId: 1,
      title: "TV that isnt 30 Rock",
      type: "TV"
    },
    {
      userId: 1,
      title: "For when I start reading",
      type: "Books"
    },
    {
      userId: 1,
      title: "For when I have money",
      type: "Travel"
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Lists', null, {});
  }
};
