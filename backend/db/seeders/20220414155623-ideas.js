'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Ideas', [
     {
      userId: 1,
      listId: 1,
      title: "Everything Everywhere",
      description: "In theaters right now"
     },
     {
      userId: 1,
      listId: 1,
      title: "Belfast",
      description: "Not streaming anywhere, will have to rent. Meg a maybe"
     },
     {
      userId: 1,
      listId: 3,
      title: "Drive My Car",
      description: "On HBO Max, very sad apparently, plan accordingly"
     },
     {
      userId: 1,
      listId: 2,
      title: "Mcdonalds",
      description: "I hear good things"
     },
     {
      userId: 1,
      listId: 2,
      title: "Cheese Cake Factory",
      description: "Looks like an egyptian pyramid on the inside? Need to see for myself"
     },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Ideas', null, {});
  }
};
