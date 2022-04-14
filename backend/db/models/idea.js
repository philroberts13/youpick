'use strict';
module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('Idea', {
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Idea.associate = function(models) {
    Idea.belongsTo(models.User, { foreignKey: 'userId' });
    Idea.belongsTo(models.List, { foreignKey: 'listId' });


  };
  return Idea;
};
